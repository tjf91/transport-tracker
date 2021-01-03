update receipts
set city=$1, state=$2, date_created=$3, lat=$4, lng=$5, type=$6, amount=$7, total=$8, trip_id=$9
where id=$10
returning *;