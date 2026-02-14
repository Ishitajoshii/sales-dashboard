# Sales Dashboard API Documentation

This document describes the API endpoints for the Sales Dashboard application.

## Base URL

The base URL for all API endpoints is `/api`.

## Authentication

No authentication is required for the current version of the API.

## Endpoints

### 1. Get All Sales

-   **Endpoint:** `GET /api/sales`
-   **Description:** Retrieves a list of all sales records.
-   **Request Body:** None
-   **Response:**

    ```json
    [
      {
        "id": 1,
        "date": "2024-01-01",
        "amount": 100,
        "product": "Product A"
      },
      {
        "id": 2,
        "date": "2024-01-02",
        "amount": 150,
        "product": "Product B"
      }
    ]
    ```

-   **Response Codes:**
    -   200 OK: Successful retrieval of sales data.
    -   500 Internal Server Error: An error occurred on the server.

### 2. Get Sales by ID

-   **Endpoint:** `GET /api/sales/:id`
-   **Description:** Retrieves a specific sale record by its ID.
-   **Request Parameters:**
    -   `id` (integer, required): The ID of the sale record to retrieve.
-   **Request Body:** None
-   **Response:**

    ```json
    {
      "id": 1,
      "date": "2024-01-01",
      "amount": 100,
      "product": "Product A"
    }
    ```

-   **Response Codes:**
    -   200 OK: Successful retrieval of the sale data.
    -   404 Not Found: Sale record with the specified ID not found.
    -   500 Internal Server Error: An error occurred on the server.

### 3. Create a New Sale

-   **Endpoint:** `POST /api/sales`
-   **Description:** Creates a new sale record.
-   **Request Body:**

    ```json
    {
      "date": "2024-01-03",
      "amount": 200,
      "product": "Product C"
    }
    ```

-   **Response:**

    ```json
    {
      "id": 3,
      "date": "2024-01-03",
      "amount": 200,
      "product": "Product C"
    }
    ```

-   **Response Codes:**
    -   201 Created: Successfully created a new sale record.
    -   400 Bad Request: Invalid request body.
    -   500 Internal Server Error: An error occurred on the server.

### 4. Update an Existing Sale

-   **Endpoint:** `PUT /api/sales/:id`
-   **Description:** Updates an existing sale record.
-   **Request Parameters:**
    -   `id` (integer, required): The ID of the sale record to update.
-   **Request Body:**

    ```json
    {
      "date": "2024-01-03",
      "amount": 250,
      "product": "Product C Updated"
    }
    ```

-   **Response:**

    ```json
    {
      "id": 3,
      "date": "2024-01-03",
      "amount": 250,
      "product": "Product C Updated"
    }
    ```

-   **Response Codes:**
    -   200 OK: Successfully updated the sale record.
    -   400 Bad Request: Invalid request body.
    -   404 Not Found: Sale record with the specified ID not found.
    -   500 Internal Server Error: An error occurred on the server.

### 5. Delete a Sale

-   **Endpoint:** `DELETE /api/sales/:id`
-   **Description:** Deletes a sale record.
-   **Request Parameters:**
    -   `id` (integer, required): The ID of the sale record to delete.
-   **Request Body:** None
-   **Response:**

    ```json
    {
      "message": "Sale deleted successfully"
    }
    ```

-   **Response Codes:**
    -   200 OK: Successfully deleted the sale record.
    -   404 Not Found: Sale record with the specified ID not found.
    -   500 Internal Server Error: An error occurred on the server.

## Data Models

### Sale

```json
{
  "id": (integer, primary key),
  "date": (string, date format YYYY-MM-DD),
  "amount": (number),
  "product": (string)
}
```