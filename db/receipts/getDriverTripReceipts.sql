select * from receipts r
join trips t
on r.trip_id=t.id
where driver_d_id=$1 and t.id=$2
order by date_created asc;