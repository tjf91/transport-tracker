select * from receipts r
join trips t
on r.trip_id=t.id
where company_id=$1 and type=$2
order by date_created desc;