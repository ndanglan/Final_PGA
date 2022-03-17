# 1.Login by Email:
- Requirement:
+ Form validate (Require inputs) **(DONE)**
+ Email verify type input  **(DONE)**
+ Password verify with min length is 6 characters  **(DONE)**
+ Redirect to Product list page after logged successfully **(DONE)**
# 2.	User Management
## a) User List
+ Get User List with filters: **(DONE)**
+ Pagination (Default is 25 items/page), show total items, allow custom limit on page (25, 50, 75, 100) **(DONE)**
+ Filters: User Types (Get types from API: /apiAdmin/commons/role), Status (include: ‘Any status’– value: ‘null’, ‘Enable’ – value ‘E’ , ‘Disable’ – value ‘D’ , ‘Unapproved vendor’ – value ‘U’) => All filter value must be is an array
+ Searching by Keyword **(DONE)**
+ Loading screen when searching/filtering **(DONE)**
+ Sort by Email, Name (ASC, DESC) **(DONE)**
+ Click to row => Redirect to User detail page **(DONE)**
+ Option to select all row to Remove selected)  **(DONE)**
+ Click to Trash icon => selected row to delete) **(DONE)**

## b) Create/Update User
+ Function to create new User or update User **(DONE)**
+ Form validate: Require for all (*) field **(DONE)**
+ Email validate **(DONE)**
+ Password min-length is 6 characters **(DONE)**
+ Password & Confirm password must be the same **(DONE)**
+ Page Create & Update user have the same UI, just need add data to Update page **(DONE)**
+ Field notes:
	* Type: Individual, Business **(DONE)**
	* Access level: Vendor – value 10, Admin – value 100. Default is ‘Vendor’ **(DONE)**
	* Membership: Ignore Membership – value null, General – value 4 **(DONE)**
## c) Delete User
+ Allow delete batch of Users => Function need working on User list page


# 3.	Product Management
## a) Product List
+ Get User List with some filters: Keywords, User Type, Status **(DONE)**
+ Pagination (Default is 25 items/page), show total items, allow custom limit on page (25, 50, 75, 100) **(DONE)**
+ Filters: Category (Get list from API: / api/categories/list), Stock Status (include: ‘Any status’– value: ‘all, ‘In Stock’ – value ‘in’ , ‘Low stock’ – value ‘low’ , ‘SOLD’ – value ‘out’)  **(DONE)**
+ Searching by Keyword **(DONE)**
+ Loading screen when searching/filtering **(DONE)**
+ Sort by SKU, Name (ASC, DESC) **(DONE)**
+ Click to row => Redirect to Product detail page ) **(DONE)**
+ Option to select all row to Remove selected **(DONE)**
+ Click to Trash icon => selected row to delete) **(DONE)**
## b)Create/Update Product
+ Function allow to create/update a Product **(DONE)**
+ Form validate: Require for all (*) field **(DONE)**
+ Page Create & Update user have the same UI, just need add data to Update page (DONE)	+ Add button only available when the form is Valid **(DONE)**
+ Allow select multiple Category  **(DONE)**
+ Allow upload multiple image **(DONE)**
+ Allow Drag & Drop image priority **(DONE)**
+ When setup the Price for product & selected “Sale” checkbox => Show the child-box with select Sale Price based on Percent(%) or Fix Price ($)
+ Date field can select date on the popup (Date picker)
+ Field notes:
	* Vendors get from API: /apiAdmin/vendors/list. => Allow to search vendor on input **(DONE)**
	
  * Brands get from API: /apiAdmin/brands/list **(DONE)**

  * Conditions get from API: /apiAdmin/conditions/list **(DONE)**

  * Categories get from API: /api/categories/list **(DONE)**

  * Shipping Location get from API: /apiAdmin/shipping/list **(DONE)**

  * Open Graph meta tags/Meta description can be custom or auto generate **(DONE)**

	* Membership: Ignore Membership – value null, General – value 4 **(DONE)**

## c) Delete Product
- Allow delete batch of Products => Function need working on Product list page **(DONE)**





