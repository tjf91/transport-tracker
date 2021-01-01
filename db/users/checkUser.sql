select * from companies c
join company_driver cd
on c.id=cd.company_id
join drivers d
on d.d_id=cd.driver_d_id
where c.name=$1 or d.name=$1;