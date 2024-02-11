truncate table rentingtbl(rentid int,carid int,dtfrom datetime,dtto datetime , km float, cost numeric(18,3), idCustomer nvarchar(10), sug int)
declare @i int = 0
while @i < 300
begin
insert into rentingtbl 
(carid,dtfrom,dtto,km,cost,idCustomer,sug)
values(RAND()* 1100,RAND()* 1100+ 40178,RAND()* 1100+ 40178,RAND()* 1100,RAND()* 1100
,cast(RAND()* 399900000+ 12345 as int),cast((RAND()*2+1) as int)*10 + RAND()*2+1)

set @i+=1

end

delete from [dbo].[rentingtbl] where dtto<dtfrom

select *,DATEDIFF(HOUR,dtfrom,dtto)שעות,DATEDIFF(DAY,dtfrom,dtto)ימים,DATEDIFF(MONTH,dtfrom,dtto)חודשים,DATEDIFF(YEAR,dtfrom,dtto)שנים from [dbo].[rentingtbl]
update [dbo].[rentingtbl] set km=round(km,2)
declare @h int
select @h=DATEDIFF(HOUR,dtfrom,dtto) from[dbo].[rentingtbl] where rentid=1
print @h
 update [dbo].[rentingtbl] set cost=20*DATEDIFF(DAY,dtfrom,dtto) from[dbo].[rentingtbl] 