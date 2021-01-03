select * from trips
where company_id=$1
order by date_start asc;