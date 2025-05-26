# Budget Buddy – Database Schema

## Users Table
| Column        | Type       | Description                    |
|---------------|------------|--------------------------------|
| id            | Integer    | Primary Key, auto-increment    |
| email         | String     | User email, must be unique     |
| password_hash | String     | Hashed password                |
| created_at    | DateTime   | Timestamp of account creation  |

---

## Transactions Table
| Column      | Type       | Description                           |
|-------------|------------|---------------------------------------|
| id          | Integer    | Primary Key                           |
| user_id     | Integer    | Foreign Key → Users.id                |
| type        | String     | 'income' or 'expense'                 |
| amount      | Decimal    | Value of the transaction              |
| category    | String     | Category (e.g., 'rent', 'food')       |
| date        | Date       | Date of the transaction               |
| description | String     | Optional note about the transaction   |

---

## Goals Table
| Column         | Type       | Description                           |
|----------------|------------|---------------------------------------|
| id             | Integer    | Primary Key                           |
| user_id        | Integer    | Foreign Key → Users.id                |
| name           | String     | Name of the goal                      |
| target_amount  | Decimal    | Target savings amount                 |
| current_saved  | Decimal    | Current amount saved                  |
| deadline       | Date       | Optional deadline to achieve the goal |
