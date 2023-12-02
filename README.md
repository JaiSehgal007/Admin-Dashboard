
# Admin Dashboard

## Overview

This project is a simple web interface for admins to view and manage user data. Users are provided via an API, and the UI allows administrators to perform actions such as searching, editing, deleting, and selecting multiple rows.

## Demo

For a live demo, you can visit the deployed application on [Vercel](#) [Netlify](#) or any similar platform.

## Features

1. **Column Titles Stand Out**: Column titles are designed to stand out from the entries for better visibility.

2. **Search Bar**: A search bar allows users to filter data based on any property.

3. **In-place Editing and Deleting**: Rows can be edited or deleted in memory. There is no persistence.

4. **Pagination**: Pagination is implemented, with each page containing 10 rows. Pagination updates dynamically based on search/filtering.

5. **Row Selection**: Users can select one or more rows, and selected rows are highlighted with a grayish background. Multiple selected rows can be deleted at once.

6. **Select/Deselect All Shortcut**: A checkbox on the top left serves as a shortcut to select or deselect all displayed rows on the current page.

7. **Search Box Placeholder**: The search box has a placeholder text starting with "Search."

8. **Search Icon/Button**: The search icon/button has a class name as `search-icon` and triggers search on ENTER.

9. **Action Buttons**: Action elements are buttons with specific class names like `edit`, `delete`, `save`.

10. **Navigation Elements**: Navigation elements are implemented as div/buttons with class names such as `first-page`, `previous-page`, `next-page`, and `last-page`. Page numbers are mentioned accordingly.

11. **In-place Editing**: Clicking on the edit action in a row allows in-place editing directly in the row.

## Data Source

The user data is fetched from the provided API endpoint:

**Request Type:** GET

**Endpoint:** [https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json)

## How to Run Locally

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Dependencies

Feel free to use any libraries of your choice.

## Deployment

The application is deployed on [Vercel](#) [Netlify](#) or any similar platform.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
