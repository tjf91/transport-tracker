select state,sum(total) as value,type from receipts r
where trip_id=$1 and state is not null
group by type,state
order by state;


