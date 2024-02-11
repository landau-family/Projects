use DWHCARSgilly


alter proc GetTableProc11
as
begin
 select Dim_Cars.CarId, ProducerName, sum(NumDays)as 'total rent time',sum(icost) as 'total cost' from Dim_Cars, Dim_Producer, Fact_Rents_New where Dim_Cars.ProducerId=Dim_Producer.ProducerId and Fact_Rents_New.CarId=Dim_Cars.CarId group by Dim_Cars.CarId, ProducerName
end

exec GetTableProc11