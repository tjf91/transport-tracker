update trips
set name=$1, date_start=$2, date_end=$3, total_spent=$4, status=$5
where id=$6
returning *;