
## API
### Endpoints



## Database


### Schema
A single table to store attendees information:

| Column | Type |
|----|----|
| Name  | String |
| Phone Number | Int |
| Email | String |
| National ID | Int | 
| University | String |
| Faculty | String |
| Graduation Year | Int |
| Registration Time | Timestamp |

**Example Create Table Command**
```bash
CREATE TABLE machathon_summit (
  name VARCHAR (50) NOT NULL,
  phone NUMERIC NOT NULL,
  email VARCHAR (255) PRIMARY KEY,
  national_id NUMERIC(14) UNIQUE,
  university VARCHAR(255) NOT NULL,
  faculty VARCHAR(255) NOT NULL,
  grad_year NUMERIC(4) NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```


### Migrations