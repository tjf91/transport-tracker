select type,sum(total) from receipts r
where trip_id=$1 and type!=''
group by type
order by type desc


