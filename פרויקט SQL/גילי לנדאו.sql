create database Fizer_Tepm_Germ_Gilly_Final3
--א
--1
USE Fizer_Tepm_Germ_Gilly_Final3
create table G_GERMS--טבלת חיידקים
(
ID NUMERIC primary key identity,--קוד חיידק
NAME varchar(20) NOT NULL UNIQUE,--שם חיידק
SHORT_DESC VARCHAR(50),--תאור קצר
ID_DATE DATE NOT NULL,--תאריך זיהוי חיידק
MEDICINE INT ,--קוד תרופה שנמצאה
MEDICINE_DATE DATE--תאירך מצחאת תרופה
)
--2
CREATE TABLE G_MEDICINE--טבלת תרופות
(
ID NUMERIC PRIMARY KEY identity ,--קוד תרופה
NAME VARCHAR(20) NOT NULL UNIQUE--שם תרופה
)
--3
CREATE TABLE G_TEST--טבלת ניסויים
(

GERM_ID NUMERIC FOREIGN KEY REFERENCES G_GERMS(ID),--קוד חיידק
MEDICINE_ID NUMERIC FOREIGN KEY REFERENCES G_MEDICINE(ID),--קוד תרופה

TEST_DATE DATE,--תאריך ניסוי
REACTION_TYPE VARCHAR(10) CHECK(REACTION_TYPE ='ALIVE' or REACTION_TYPE='DYING' OR REACTION_TYPE='DEAD')--סטאטוס ניסוי
primary key(GERM_ID,MEDICINE_ID)
)
--4
CREATE TABLE G_ARCHIEVE--טבלת ארכיון
(
GERM_NAME varchar(20),--שם חיידק
GERM_ID NUMERIC FOREIGN KEY REFERENCES G_GERMS(ID),--קוד חיידק
MEDICINE_NAME VARCHAR(20) FOREIGN KEY REFERENCES G_MEDICINE(NAME),--שם תרופה

TEST_DATE DATETIME,--תאריך ניסוי
REACTION_TYPE VARCHAR(10) CHECK(REACTION_TYPE ='ALIVE' or REACTION_TYPE='DYING' OR REACTION_TYPE='DEAD')--סטאטוס
primary key(GERM_ID,MEDICINE_NAME)
)
--5
CREATE TABLE G_EXCEPTION_TABLE--טבלת הודעות שגיאה
(
MESSAGE VARCHAR(300),--הודעת השגיאה
MessageDate DATETIME--זמן קבלת ההודעה
)


--------------------------------------------------------------------------------------------------------------------

--ב


--הכנסת תוכן לטבלת חיידקים
insert into G_GERMS (name, short_desc, ID_DATE)
values 
('PASTI','','01-jan-97'),
('KA','very slim','22-may-97'),
('YOCUS','very old','30-jul-98'),
('KARUS','','05-FEB-99'),
('BAKTUS','','18-MAY-99')

insert into G_GERMS (name, short_desc, ID_DATE)
values ('ssde','','22-may-56')
--הכנסת תוכן לטבלת תרופות
INSERT into G_MEDICINE (name) 
values
('UNTI'), 
('ACAMOL'), 
('PENITZILIN'), 
('ASPARIN')

select * from G_GERMS
--ID                                      NAME                 SHORT_DESC                                         ID_DATE    MEDICINE    MEDICINE_DATE
----------------------------------------- -------------------- -------------------------------------------------- ---------- ----------- -------------
--1                                       PASTI                                                                   1997-01-01 NULL        NULL
--2                                       KA                   very slim                                          1997-05-22 NULL        NULL
--3                                       YOCUS                very old                                           1998-07-30 NULL        NULL
--4                                       KARUS                                                                   1999-02-05 NULL        NULL
--5                                       BAKTUS                                                                  1999-05-18 NULL        NULL

select * from G_MEDICINE
--ID                                      NAME
----------------------------------------- --------------------
--2                                       ACAMOL
--4                                       ASPARIN
--3                                       PENITZILIN
--1                                       UNTI


---------------------------------------------------------------------------------------------------------------------



--ג
--1
create view G_SHUTS_VW as --המתאר את החיסונים הקיימים VIEW
select m.Name as M_NAME,--שם תרופה
g.name as G_NAME,--שם חיידק
g.Medicine_Date as FOUND_DATE --תאריך מציאת תרופה
from G_Germs g 
join G_Medicine m 
on g.MEDICINE=m.Id  
where g.MEDICINE is not null--בתנאי שקיימת תרופה

select * from G_SHUTS_VW

---------------------------------------------------------------------------------------------

--ב

--1

--הוספת הודעות שגיאה למערכת

exec sp_addmessage
@msgnum=70000,
@severity=22,
@msgtext='g_germ: no such germ'
exec sp_addmessage
@msgnum=70001,
@severity=22,
@msgtext='g_medicine: no such medicine'
exec sp_addmessage
@msgnum=70002,
@severity=22,
@msgtext='g_test: medicine already tested for this germ'
exec sp_addmessage
@msgnum=70003,
@severity=22,
@msgtext='g_test: wrong status'

create proc ADD_TEST_SQL
@germ1 varchar(30) , --שם חיידק
@medicine1 varchar(30) ,--שם תרופה
@date date, --תאריך
@state varchar(10)--סטאטוס
as
begin
	begin transaction
		begin try
		--משתנים להחזקת קוד תרופה וחיידק
			declare @germ int, @medicine int
			declare @check int=1--משתנה בדיקה אם היו שגיאות
			--, @check2 int=1
			--declare @error as nvarchar(30)
			--declare @c int
			--select @c=count(*) from G_TEST
			--check problems
			if --בדיקה אם קיים חיידק כזה
			(select count(*) from G_GERMS where name=@germ1 )=0
			begin
				--set @error='g_germ: no such germ'
				--PRINT @ERROR
				set @check=0
				
				--insert into G_EXCEPTION_TABLE values (@error,getdate())
				raiserror(70000,16,1)
				
			end
			else
			begin
			--שמירת קוד החיידק למשתנה
				select @germ=id from G_GERMS where name=@germ1
			end
			if--בדיקה אם קיימת כזאת תרופה
			(select count(*) from G_MEDICINE where name=@medicine1 )=0
			begin
				--set @error='g_medicine: no such medicine'
				--PRINT @ERROR
				set @check=0
				--insert into G_EXCEPTION_TABLE values (@error,getdate())
				raiserror(70001,16,1)
			end
			else
			begin
			--שמירת קוד התרופה במשתנה
				select @medicine=id from G_MEDICINE where name=@medicine1
			end
			if --בדיקה אם נעשה ניסוי על חיידק זה עם תרופה זו
			(select count(*) from G_TEST where GERM_ID=@germ and MEDICINE_ID=@medicine )>0 OR
			(select MEDICINE from G_GERMS where ID=@germ and medicine is not null  )>0
			begin
				--set @error='g_test: medicine already tested for this germ'
				set @check=0
				--insert into G_EXCEPTION_TABLE values (@error,getdate())
				raiserror(70002,16,1)
			end
			if --בדיקה אם הסטאטוס תקין
			@state!='ALIVE' AND @state !='DYING' AND @state !='DEAD'
			begin
				--set @error='g_test: wrong status'
				set @check=0
				--insert into G_EXCEPTION_TABLE values (@error,getdate())
				raiserror(70003,16,1)
			end
			if @check=1--הוספת הניסוי אם הקלט תקין
			begin
				insert into G_TEST 
				(GERM_ID,MEDICINE_ID,TEST_DATE,REACTION_TYPE)
				values (@germ, @medicine,@date,@state)
				if  @state='DEAD'
					--במקרה שלא היו שגיאות וחיידק מת
					begin
					--עדכונים נדרשים
					update G_GERMS set medicine=@medicine ,
						MEDICINE_DATE=@date where id=@germ
						exec MOVE_TO_ARCHIEVE @germ--העברה לטבלת ארכיון
		
		
					end
				commit 
			end	
			
		end try
		
		begin catch
			rollback
			if @check=0 --בודק אם הייתה שגיאה של המערכת 
			and ERROR_NUMBER()!=70000 
			and ERROR_NUMBER()!=70001 
			and ERROR_NUMBER()!=70002 
			and ERROR_NUMBER()!=70003
			begin
				--set @error='g_test:' + ERROR_MESSAGE()
				insert into G_EXCEPTION_TABLE --הוספה לטבלת שגיאות
				values
				('g_test:' + ERROR_MESSAGE(),getdate())
				print 'g_test:' + ERROR_MESSAGE()--הדפסת הודעת שגיאה
			end
			else--במקרה שהשגיאה בעבות קלט לא תקין
			begin
				insert into G_EXCEPTION_TABLE--הוספה לטבלת שגיאות
				values 
				(ERROR_MESSAGE(),getdate())
				print ERROR_MESSAGE()--הדפסת הודעת שגיאה
			end
			set @check=0			
		end catch
	--end 
	
	
end

EXEC ADD_TEST_SQL 10,20, '01-JAN-99', 'DEAD'
--g_germ: no such germ
 
SELECT * FROM G_EXCEPTION_TABLE
SELECT *FROM G_TEST
SELECT *FROM g_ARCHIEVE
SELECT *FROM G_GERMS
--GERM_ID                                 MEDICINE_ID                             TEST_DATE  REACTION_TYPE id
----------------------------------------- --------------------------------------- ---------- ------------- -----------
EXEC ADD_TEST_SQL 'PASTI','ASPARIN', '01-JAN-99', 'DEAD'
--ID                                      NAME                 SHORT_DESC                                         ID_DATE    MEDICINE    MEDICINE_DATE
----------------------------------------- -------------------- -------------------------------------------------- ---------- ----------- -------------
--1                                       PASTI                                                                   1997-01-01 4           1999-01-01
EXEC ADD_TEST_SQL 'KA','ASPARIN', '01-JAN-99', 'DEAD'

--GERM_NAME            GERM_ID                                 MEDICINE_NAME        TEST_DATE               REACTION_TYPE
---------------------- --------------------------------------- -------------------- ----------------------- -------------
--KA                   2                                       ASPARIN              1999-01-01 00:00:00.000 DEAD

EXEC ADD_TEST_SQL 'KARUS','ASPARIN', '01-JAN-99', 'DYING'
--GERM_ID                                 MEDICINE_ID                             TEST_DATE  REACTION_TYPE id
----------------------------------------- --------------------------------------- ---------- ------------- -----------
--3                                       4                                       1999-01-01 ALIVE         4


--------------------------------------------------------------------

--צויין בתרגילים למרות שלא היה כתוב ביצירה של הטבלאות ולכן מטעמי נוחות הוספתי
alter table G_TEST
add id int identity

--2
create proc UPDATE_STATUS 
@test int ,--קוד ניסוי
@state varchar(10)--סטאטוס חדש
as
begin
--עדכון הניסוי
update g_test set REACTION_TYPE=@state where id=@test
--בדיקה אם הסטאטוס הוא - מת 
if @state='Dead'
begin
--הגדרת משתנים הדרושים
declare @germ int,@date date,@medicine varchar(30)
--השמת הערכים
select @germ=germ_id ,
@date=test_date,
@medicine=MEDICINE_ID from g_test where id=@test
exec MOVE_TO_ARCHIEVE @germ--הפעלת הפעולה של העברת לארכיון
--עדכון הפרטים
update G_GERMS 
set medicine=@medicine,
MEDICINE_DATE=@date
end
end
exec UPDATE_STATUS 1, 'DYING'
select * from G_TEST
--GERM_ID                                 MEDICINE_ID                             TEST_DATE  REACTION_TYPE id
----------------------------------------- --------------------------------------- ---------- ------------- -----------
--3                                       4                                       1999-01-01 dying         4

----------------------------------------------------------------


--3
create procedure MOVE_TO_ARCHIEVE @germ int 
as
begin
--העברה לארכיון
insert into G_ARCHIEVE 
select g.NAME,t.GERM_ID, m.NAME,t.TEST_DATE,t.REACTION_TYPE 
from G_TEST t 
join G_MEDICINE m 
on t.MEDICINE_ID=m.ID 
join G_GERMS g 
on g.ID=t.GERM_ID
where t.GERM_ID=@germ
--מחיקה מהניסויים
delete from G_TEST where GERM_ID=@germ
end
exec MOVE_TO_ARCHIEVE 3
select * from g_test
--GERM_ID                                 MEDICINE_ID                             TEST_DATE  REACTION_TYPE id
--------------------------------------- --------------------------------------- ---------- ------------- -----------
select * from G_ARCHIEVE
--GERM_NAME            GERM_ID                                 MEDICINE_NAME        TEST_DATE               REACTION_TYPE
---------------------- --------------------------------------- -------------------- ----------------------- -------------
--PASTI                1                                       ASPARIN              1999-01-01 00:00:00.000 DEAD
--YOCUS                3                                       ASPARIN              1999-01-01 00:00:00.000 dying

----------------------------------------------------------------------
--create proc UPDATE_STATUS @test int ,@state varchar(10)
--as
--begin
--update g_test set REACTION_TYPE=@state where id=@test
--if @state='Dead'
--begin
--declare @germ int,@date date,@medicine varchar(30)
--select @germ=germ_id ,@date=test_date, @medicine=MEDICINE_ID from g_test where id=@test
--exec MOVE_TO_ARCHIEVE @germ;
--update G_GERMS set medicine=(select name from G_MEDICINE where id=@medicine),
--MEDICINE_DATE=@date
--end
--end

---------------------------------------------------------------------------

--4
alter proc STAYING_ALIVE @test int 
as 
begin
declare @date int=DATEDIFF(month,getdate(),(select top 1 month(test_date)  from G_TEST where id=@test)) 
if @date>2 or @date<-2 and exists(select * from g_test where id=@test and REACTION_TYPE='DYING') 
begin
execute UPDATE_STATUS @test , 'ALIVE'
print 'changing status'
end
else
begin
print 'no changes needed'
end
end
select *from g_test
execute STAYING_ALIVE 1

---------------------------------------------------------

alter proc CURSOR_PROC as
begin
	declare @month int,@id int
            declare crs cursor scroll
			for select month(test_date), id from G_TEST
			open crs
			fetch first from crs into @month,@id
			while @@FETCH_STATUS =0
			begin
			print @id
			print @month
				if DATEDIFF(month,getdate(),@month)>2 or DATEDIFF(month,getdate(),@month)<-2 and exists(select * from g_test where id=@id and REACTION_TYPE='DYING')
				begin
					exec STAYING_ALIVE @id
				end
				fetch next from crs into @month,@id
			end
			close crs
			deallocate crs
end

exec CURSOR_PROC
select * from G_TEST
----4.b
--USE Master
--GO
--alter PROCEDURE RUN_EVERY_DAY
--AS
--BEGIN
--    -- SET NOCOUNT ON added to prevent extra result sets from
--    -- interfering with SELECT statements.
--    SET NOCOUNT ON;

--    -- The interval between cleanup attempts
--    declare @timeToRun nvarchar(50)
--    set @timeToRun = '08:33:33'

--    while 1 = 1
--    begin
--        waitfor time @timeToRun
--        begin
--			exec [Fizer_Tepm_Germ_Gilly_Final2].[dbo].[CURSOR_PROC ]
--			insert into G_EXCEPTION_TABLE values ('it is working:)',getdate())
--        end
--    end
--END
--GO

---- Run the procedure when the master database starts.
--sp_procoption    @ProcName = 'RUN_EVERY_DAY',
--                @OptionName = 'startup',
--                @OptionValue = 'on'
--GO

--5
create trigger CHECK_IF_UPDATE_TO_ALIVE on G_TEST for update,insert
as
begin 
	
	
		declare @id int 
		select @id=i.id from inserted i where month(getdate())-month(i.TEST_DATE)>2 and i.REACTION_TYPE='DYING'
		execute UPDATE_STATUS @id, 'ALIVE'
	
end

exec UPDATE_STATUS 2 ,'DYING'
select * from g_test
--6

create trigger CHECK_DEAD on g_test for update, insert
as
begin
declare @id int,@state varchar(10)
select @id=germ_id, @state=reaction_type from inserted
	if @state= 'DEAD'
	begin
		exec MOVE_TO_ARCHIEVE @id
	end
end
--תשובה:
--ניתן למחוק בכל הפונקציות הקודמות את ההפעלה של פונקציית העברה לארכיון
--------------------------------------------------------------------------
--7
alter function TEST_TO_GERM(@germId int)
returns int
as
begin
declare @c int
 select @c=count(id) from G_TEST where GERM_ID=@germId
 return @c
end

print dbo.TEST_TO_GERM(3)
--------------------------------------------------------------------------

--8
create function GERM_FOR_SHUT(@name varchar(20))
returns table
as 
return
(
select g.NAME from G_MEDICINE m join G_GERMS g on g.MEDICINE=m.ID
)

select * from dbo.GERM_FOR_SHUT('ASPARIN')

--NAME
----------------------
--PASTI
--KA

-------------------------------------------------------------------
--9
create function MAX_COUNT()
returns int 
as
begin
declare @count int
select @count=max(dbo.TEST_TO_GERM(germ_id)) from G_TEST
return @count
end
PRINT dbo.Max_count()
create function GERM_MOST_PRENSISTENT ()
returns table
as
return
(
select g.NAME from g_test t join G_GERMS g on t.GERM_ID=g.ID where dbo.TEST_TO_GERM(t.GERM_ID)=dbo.MAX_COUNT()
)
select * from dbo.GERM_MOST_PRENSISTENT()
--NAME
----------------------
--YOCUS
--KARUS

----------------------------------------------------------------------
--10

--insert into G_GERMS (name, short_desc, ID_DATE) values ('PASTI2','','01-jan-97'),
--('KA2','very slim','22-may-97'),
--('YOCUS2','very old','30-jul-98'),
--('KARUS2','','05-FEB-99'),
--('BAKTUS2','','18-MAY-99')
--exec ADD_TEST_SQL 'PASTI2', 'ASPARIN', '01-jan-97','ALIVE'
--exec ADD_TEST_SQL 'KA2', 'ACAMOL', '01-jan-98','ALIVE'
--exec ADD_TEST_SQL '2', '3', '01-jan-97','ALIVE'
--exec ADD_TEST_SQL 'YOCUS2', 'ASPARIN', '01-jan-97','ALIVE'
--select * from G_TEST
--select * from ARCHIEVE
--select * from G_EXCEPTION_TABLE
--exec UPDATE_STATUS 12 ,'DEAD'
--update  g_test set reaction_type='DEAD' where id=8

begin try
begin transaction
declare @year varchar(max)=''
select @year+='['+cast(year(test_date) as varchar)+'],' from G_TEST group by year(test_date)
select cast(year(test_date) as varchar)from G_TEST group by year(test_date)
	set @year=left(@year ,len(@year)-1)
--set @year=dbo.GET_YEARS()

declare @sql varchar(max)
set @sql='select * from (select germ_id, year(test_date)y, id from G_TEST )q
pivot(count(id) for y in('+@year+'))pvt'
exec (@sql)
end try
begin catch
rollback
end catch
--germ_id                                 1997        1998
----------------------------------------- ----------- -----------
--6                                       2           1
--7                                       1           0


----------------------------------------------------------------------------------------------
--11
select * from (select min(test_date) as min, max(test_date) as max, germ_id from G_TEST group by GERM_ID)q
unpivot(test_date for MinOrMax in (min,max))as pvt
--germ_id                                 test_date  MinOrMax
----------------------------------------- ---------- --------------------------------------------------------------------------------------------------------------------------------
--6                                       1997-01-01 min
--6                                       1998-01-01 max
--7                                       1997-01-01 min
--7                                       1997-01-01 max


----------------------------------------------------------------------------------------------

create proc CURSOR_CHECK_NAME2 as
begin
	declare @name varchar(20)
            declare crs cursor scroll
			for select name from G_GERMS
			open crs
			fetch first from crs into @name
			while @@FETCH_STATUS =0
			begin		
				if  ascii(LEFT(@name,1))>=ascii('A') and ascii(LEFT(@name,1))<=ascii('Z')
				begin
				PRINT LEFT(@name,1)
				print @name +':ok'
				end
				else
				begin
				print @name+': not ok'
				end
				
				fetch next from crs into @name
			end
			close crs
			deallocate crs
end
exec CURSOR_CHECK_NAME2

select * from G_SHUTS_VW
select * from dbo.GERM_MOST_PRENSISTENT()
EXEC ADD_TEST_SQL 'PASTI','ASPARIN', '01-JAN-99', 'sdd'
--ID                                      NAME                 SHORT_DESC                                         ID_DATE    MEDICINE    MEDICINE_DATE
----------------------------------------- -------------------- -------------------------------------------------- ---------- ----------- -------------
--1                                       PASTI                                                                   1997-01-01 4           1999-01-01
EXEC ADD_TEST_SQL 'KARUS','ACAMOL', '01-JAN-99', 'DYING'

--GERM_NAME            GERM_ID                                 MEDICINE_NAME        TEST_DATE               REACTION_TYPE
---------------------- --------------------------------------- -------------------- ----------------------- -------------
--KA                   2                                       ASPARIN              1999-01-01 00:00:00.000 DEAD

EXEC ADD_TEST_SQL 'KARUS','ASPARIN', '01-JAN-99', 'DYING'
exec UPDATE_STATUS 1, 'ALIVE'
select * from G_TEST
select* from G_ARCHIEVE
exec MOVE_TO_ARCHIEVE 3
select * from g_test
select *from g_test

execute STAYING_ALIVE 1

exec CURSOR_PROC
select * from G_TEST

exec UPDATE_STATUS 2 ,'DYING'
select * from g_test