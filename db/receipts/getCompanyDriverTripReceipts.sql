select r.id,r.date_created,r.city,r.state,r.lng,r.lat,r.type,r.amount,r.total,r.trip_id,t.driver_d_id,t.company_id from receipts r
join trips t
on r.trip_id=t.id
where company_id=$1 and t.id=$2
order by date_created desc;