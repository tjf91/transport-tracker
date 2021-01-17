select * from trips
where company_id=$1 and driver_d_id=$2
order by date_start desc;