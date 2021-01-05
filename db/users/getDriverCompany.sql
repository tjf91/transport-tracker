select c.name,c.id from companies c
join company_driver cd
on c.id=cd.company_id
join drivers d
on d.d_id=cd.driver_d_id
where d.d_id=$1;