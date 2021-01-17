select sum(total) from receipts
where trip_id=$1;