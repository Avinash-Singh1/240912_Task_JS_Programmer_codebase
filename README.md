# Chemical Management System (240912_Task_JS_Programmer)

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Project Working](#project-working)
4. [Project Design Approach](#project-design-approach)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Future Advancements](#future-advancements)
8. [Conclusion](#conclusion)
9. [Reference](#reference)
10. [Screenshots](#screenshots)

## 1. Introduction
The Chemical Management System is an online tool that allows users to effectively add, remove, and modify rows of information to manage chemical data. Users can move rows up or down, refresh the data, and export the table in CSV format, among other things. Users can also edit the data inline by double-clicking on a row, which further enhances the interactive nature of the data. In order to narrow down results based on chemical names or vendors, the program also has a search box. It uses Bootstrap for design, is completely responsive, and works offline on any device when installed as a Progressive Web App (PWA). To guarantee data retention even after page reloads, all operations—including row transfers and deletions—are persistent utilizing local storage. The application uses jQuery in conjunction with libraries from cdnjs.cloudflare for the CSV export capability. To further optimize performance, many additional libraries—including Bootstrap—have been kept locally to guarantee that the application runs without external dependencies.

## 2. Project Overview
The purpose of the Chemical Management System is to offer a simplified interface for handling chemical data. The principal aim is to facilitate the manipulation of a chemical list by users using an intuitive table interface. Important characteristics consist of: 

- **Add Row**: Allows users to add new entries to the table. 
- **Delete Row**: Allows for the removal of particular rows. 
- **Move Rows**: This feature allows you to move rows up and down and change their order as necessary. 
- **Refresh Data**: Returns the table to its initial configuration. 
- **Edit Rows**: By double-clicking a row, users can make real-time updates possible. 
- **Search**: A search box allows users to look for vendors or compounds. 
- **CSV Export**: This creates an external CSV file containing the table data. 

Utilizing HTML, CSS, JavaScript, Bootstrap, and jQuery in its construction, the application is both efficient and lightweight. Users can install it on their devices and use it offline since it also works as a PWA. User actions are saved between sessions thanks to the usage of local storage for change persistence.

## 3. Project Working
The application features a well-structured table displaying details such as the chemical name, vendor, density, viscosity, and other related properties. 

Here’s how the key functionalities work:
- **Adding Rows**: Users can insert new rows into the table, providing details for each chemical.
- **Deleting Rows**: The user can remove unwanted rows by selecting the delete button.
- **Moving Rows Up or Down**: Row order can be adjusted, and changes are saved in the local storage so that the arrangement persists on refresh.
- **Editing Rows**: Double-clicking on any row will make it editable, allowing users to modify existing chemical details. The updated data will automatically be reflected in the table.
- **Search Functionality**: Users can enter keywords in the search bar to filter chemicals by their name or vendor.
- **CSV Export**: The application allows users to export the table data into a CSV file, enabling easy data sharing or reporting.

## 4. Project Design Approach
The design of the application follows a modular approach, keeping the user interface simple and intuitive. Key design decisions include:
- **Responsive Design**: Using Bootstrap, the application is fully responsive, ensuring that it works seamlessly across devices, from desktops to mobile phones.
- **Local Storage for Persistence**: Local storage is utilized to save row movements, deletions, and other changes, ensuring that the user's data remains intact even after refreshing the page.
- **No External Dependencies**: All external libraries (such as Bootstrap and jQuery) have been stored locally within the project files. This ensures that the application does not rely on external servers for these resources, improving performance and offline accessibility.
- **Progressive Web App (PWA)**: The application is designed as a PWA, meaning it can be installed on a device and used offline, enhancing usability and flexibility.

## 5. Testing
The application was tested thoroughly using standard browser debugging tools. Since it is built with pure HTML, CSS, and JavaScript, testing and debugging were simplified by using browser-based developer tools, which made it easy to trace issues related to functionality, styling, or performance.

Key aspects of testing included:
- **Functionality Testing**: Ensured that all operations (add, delete, move rows, etc.) worked as expected and that data persisted through page reloads.
- **Browser Compatibility**: Verified that the application functions consistently across major browsers (Chrome, Firefox, Safari).
- **Responsiveness Testing**: Checked that the application responds well on different screen sizes and devices, ensuring an optimal user experience on both desktop and mobile.
- **PWA Testing**: Confirmed the offline functionality and proper installation of the app on various devices.

## 6. Deployment
The application was deployed using GitHub for version control and Netlify for static hosting. These platforms were chosen for their ease of use, reliability, and ability to handle static web applications.
- **GitHub**: The codebase is hosted in a public GitHub repository, ensuring easy access for collaboration and review.
- **Netlify**: The static website was deployed on Netlify, offering a fast and secure way to host the application with continuous deployment from the GitHub repository.

## 7. Future Advancements
To improve the application further, several future advancements could be implemented:
- **Backend Integration**: Adding a backend (Node.js, Express, etc.) with a database (MongoDB, MySQL) for storing chemical data, enabling multi-user support and centralized data storage.
- **Advanced Search Filters**: Adding more detailed search filters, allowing users to filter based on multiple criteria (e.g., chemical properties).
- **Data Visualization**: Incorporating charts or graphs to visually represent chemical data for better insights and analysis.
- **Offline Data Synchronization**: Allowing offline data to synchronize with the server when the device regains internet connectivity, ensuring data integrity across sessions.
- **User Authentication**: Implementing user login functionality, so multiple users can access personalized data.
- **Export to Other Formats**: Extending the export feature to include formats like PDF or Excel.

## 8. Conclusion
The Chemical Management System offers a comprehensive solution for managing chemical data through a responsive and user-friendly interface. The integration of key features such as row manipulation, search, and CSV export enhances the application's utility, while the use of local storage ensures persistence of data across sessions. The application’s PWA capabilities further extend its usability, allowing it to be installed on any device for offline use. The decision to use Bootstrap and jQuery ensures that the application is lightweight, efficient, and easy to maintain. As the system evolves, future enhancements like backend integration, advanced search filters, and data visualization will further extend its capabilities. This project serves as a solid foundation for building more advanced chemical data management solutions, providing a robust and scalable platform for future development.

## 9. Reference
1. **Bootstrap Documentation**
   - **Source**: Bootstrap Official Website
   - **Description**: Used for styling and responsive design components throughout the application.
   
2. **jQuery Documentation**
   - **Source**: jQuery Official Website
   - **Description**: Utilized for DOM manipulation and enabling export to CSV functionality.

3. **Progressive Web Apps (PWA) Guide**
   - **Source**: Google Developers
   - **Description**: PWA principles and techniques used to enable offline functionality and device installation.

4. **Local Storage API**
   - **Source**: MDN Web Docs
   - **Description**: Local storage is used to persist data and row positions between sessions.

5. **CSV Export Functionality (cdnjs)**
   - **Source**: cdnjs Cloudflare
   - **Description**: CDN hosting of libraries like jQuery used to implement CSV export functionality.

## 10. Screenshots

![main](https://github.com/user-attachments/assets/7203e462-9b5f-4ca4-87d6-c1dd082d6ef1)

![export2](https://github.com/user-attachments/assets/b465155f-6e5f-4ed9-a3fa-abbbdb7f5363)

![export1](https://github.com/user-attachments/assets/4076d7fa-47a7-4944-a2d7-9267c2f5e8cd)
