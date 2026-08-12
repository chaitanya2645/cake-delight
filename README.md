# Cake Delight — Cloud Native Microservices

## Capstone Project — Cloud Native Microservices Engineering

**Developer:** Sri Sai Krishna Chaitanya Bheri  
**Project Name:** Cake Delight  
**Project Type:** Cloud Native Microservices Application  
**Architecture:** Microservices  
**Backend:** Node.js + Express.js  
**Frontend:** HTML, CSS, JavaScript  
**Database:** MongoDB  
**Message Broker:** RabbitMQ  
**Containerization:** Docker  
**Orchestration:** Kubernetes  
**Kubernetes Environment:** Minikube  
**Version Control:** Git  

---

# 1. Project Overview

Cake Delight is a cloud-native online cake ordering application developed using a microservices architecture.

The project was developed as a Capstone Project for Cloud Native Microservices Engineering.

The purpose of the application is to demonstrate the complete lifecycle of a cloud-native application, including:

- Microservices design
- REST API development
- Database-backed services
- API Gateway implementation
- Asynchronous event-driven communication
- RabbitMQ messaging
- Docker containerization
- Kubernetes deployment
- Kubernetes service discovery
- Kubernetes scaling
- Kubernetes self-healing
- Frontend integration
- End-to-end application testing
- Git-based version control

The application provides an end-to-end customer workflow where a customer can browse cakes, search and filter cakes, add cakes to a basket, modify the basket, checkout, receive an order confirmation notification, and manage cake ratings.

---

# 2. Developer

## Sri Sai Krishna Chaitanya Bheri

This project was designed, developed, containerized, deployed, tested, and documented by:

**Sri Sai Krishna Chaitanya Bheri**

The implementation demonstrates cloud-native development using independently deployable services, REST-based communication, event-driven messaging, Docker containers, MongoDB persistence, and Kubernetes orchestration.

---

# 3. Problem Statement

The objective of the project is to design and develop a cloud-native cake ordering application using a microservices-based architecture.

The application must support an end-to-end customer journey that allows users to:

1. Browse available cakes.
2. Search cakes.
3. Filter cakes by category.
4. Filter cakes by price range.
5. Add cakes to a shopping basket.
6. Update basket quantities.
7. Remove basket items.
8. Clear the basket.
9. Complete checkout.
10. Create an order.
11. Publish an order completion event.
12. Generate an order confirmation notification.
13. Submit cake ratings.
14. Retrieve cake ratings.
15. Calculate average cake ratings.

The application also demonstrates cloud-native principles including:

- Loose coupling
- Independent services
- API-based communication
- Event-driven communication
- Containerization
- Kubernetes orchestration
- Service discovery
- Scalability
- Self-healing
- Database separation

---

# 4. Project Objectives

The main objectives of Cake Delight are:

1. Implement a real-world business application using microservices.
2. Separate business capabilities into independent services.
3. Implement REST APIs using Node.js and Express.js.
4. Implement an API Gateway as the single entry point.
5. Use MongoDB for persistence.
6. Use separate databases for different business services.
7. Use RabbitMQ for asynchronous event communication.
8. Containerize backend services using Docker.
9. Deploy the application using Kubernetes.
10. Use Minikube as the local Kubernetes cluster.
11. Demonstrate Kubernetes service discovery.
12. Demonstrate horizontal scaling.
13. Demonstrate Kubernetes self-healing.
14. Implement a simple customer-facing frontend.
15. Demonstrate an end-to-end cloud-native workflow.
16. Maintain the project using Git.

---

# 5. Functional Requirements

The application supports the following functional capabilities.

## 5.1 Cake Catalog

Customers can:

- View all cakes.
- Search cakes by name.
- Filter cakes by category.
- Filter cakes by minimum price.
- Filter cakes by maximum price.
- Filter cakes using a combination of criteria.

Example cakes available in the catalog include:

- Black Forest Cake
- Red Velvet Cake
- Vanilla Birthday Cake
- Chocolate Truffle Cake

---

## 5.2 Shopping Basket

Customers can:

- Add cakes to the basket.
- Add multiple quantities of a cake.
- View basket contents.
- Update quantities.
- Remove individual items.
- Clear the complete basket.
- View the calculated total amount.

---

## 5.3 Checkout

Customers can:

- Checkout the current basket.
- Create an order.
- Receive an order confirmation.
- Generate an order completion event.

The order contains:

- User ID
- Cake items
- Quantity
- Price
- Subtotal
- Total amount
- Order status
- Order creation timestamp

---

## 5.4 Ratings

Customers can:

- Submit a rating for a cake.
- Add a comment.
- Retrieve ratings for a cake.
- Calculate the average rating.
- Delete a rating.

Ratings are stored independently from catalog and order data.

---

## 5.5 Notifications

After a successful checkout:

1. The Order Service creates the order.
2. The Order Service publishes an `order.completed` event.
3. RabbitMQ receives the event.
4. Notification Service consumes the event.
5. Notification Service creates an order confirmation notification.
6. The notification is stored in MongoDB.
7. The frontend can retrieve customer notifications.

---

# 6. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| Mongoose | MongoDB object modeling |
| MongoDB | Data persistence |
| RabbitMQ | Asynchronous message broker |
| Docker | Containerization |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes cluster |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend logic |
| Git | Source code version control |
| curl | API testing |
| kubectl | Kubernetes management |

---

# 7. Architecture Overview

The application follows a microservices architecture.

```text
                         +-------------------------+
                         |        FRONTEND         |
                         |    HTML / CSS / JS      |
                         +------------+------------+
                                      |
                                      | HTTP
                                      v
                         +-------------------------+
                         |      API GATEWAY        |
                         |        Port 3000        |
                         +------------+------------+
                                      |
              +-----------------------+-----------------------+
              |                       |                       |
              v                       v                       v
     +----------------+      +----------------+      +----------------+
     | Catalog Service|      |  Order Service |      | Rating Service |
     |    Port 3001   |      |    Port 3002   |      |    Port 3003   |
     +-------+--------+      +-------+--------+      +-------+--------+
             |                       |                       |
             v                       v                       v
        +----------+             +----------+             +----------+
        | catalogdb|             |  orderdb |             | ratingdb |
        +----------+             +----------+             +----------+

                                  |
                                  | order.completed
                                  v
                           +--------------+
                           |   RabbitMQ   |
                           | order.completed
                           +------+-------+
                                  |
                                  | consume event
                                  v
                       +-----------------------+
                       | Notification Service  |
                       |       Port 3004       |
                       +-----------+-----------+
                                   |
                                   v
                              +------------+
                              |notification|
                              |     db     |
                              +------------+
# 8. Expected Deliverables

The Cake Delight project provides the following deliverables required for the Cloud Native Microservices Engineering Capstone Project.

## 8.1 Source Code

Source code is provided for the following services:

- Catalog Service
- Order Service
- Rating Service
- Notification Service
- API Gateway
- Frontend application

Each backend service contains its own application code, configuration, controllers, routes, models, services, and supporting components.

---

## 8.2 Dockerfiles

Dockerfiles are provided for the backend services:

```text
catalog-service/Dockerfile
gateway/Dockerfile
order-service/Dockerfile
rating-service/Dockerfile
notification-service/Dockerfile
These Dockerfiles are used to package the services into Docker images.

8.3 Kubernetes Configuration
Kubernetes configuration files are provided under:


kubernetes/
The directory contains:


catalog-service.yaml
gateway.yaml
mongodb.yaml
notification-service.yaml
order-service.yaml
rabbitmq.yaml
rating-service.yaml
These files define the Kubernetes Deployments and Services required to run the application.

8.4 Frontend
A simple frontend has been implemented using:


frontend/index.html
frontend/style.css
frontend/app.js
The frontend communicates with the API Gateway and provides the customer-facing application interface.

8.5 Database Design
MongoDB is used as the persistence layer.

Logical databases are separated according to service ownership:


catalogdb
orderdb
ratingdb
notificationdb
8.6 Event Communication
RabbitMQ is used for asynchronous communication.

The Order Service publishes:


order.completed
The Notification Service consumes this event and creates an order confirmation notification.

9. API Gateway
The API Gateway acts as the single entry point for the frontend.

Instead of the frontend communicating directly with every microservice, all requests are sent through the Gateway.


Frontend
   |
   v
API Gateway
   |
   +----> Catalog Service
   |
   +----> Order Service
   |
   +----> Rating Service
   |
   +----> Notification Service
The Gateway runs on:


Port: 3000
The Gateway is exposed through a Kubernetes NodePort Service.

9.1 Gateway Service Configuration
The Gateway uses the following Kubernetes service URLs:


CATALOG_SERVICE_URL=http://catalog-service:3001

ORDER_SERVICE_URL=http://order-service:3002

RATING_SERVICE_URL=http://rating-service:3003

NOTIFICATION_SERVICE_URL=http://notification-service:3004
These URLs use Kubernetes Service DNS names instead of Pod IP addresses.

This allows Pods to be recreated without requiring application configuration changes.

10. REST API Communication
The application uses REST APIs for synchronous communication.

The general request flow is:


Client
  |
  v
API Gateway
  |
  v
Required Microservice
  |
  v
Database
  |
  v
Response
  |
  v
API Gateway
  |
  v
Client
REST APIs are used for operations where an immediate response is required.

Examples include:

Retrieving cakes

Searching cakes

Filtering cakes

Managing baskets

Checkout

Managing ratings

Retrieving notifications

11. Catalog Service
The Catalog Service manages cake information.

Responsibilities
The Catalog Service provides functionality for:

Listing cakes

Retrieving cake information

Searching by cake name

Filtering by category

Filtering by minimum price

Filtering by maximum price

Creating cakes

Updating cakes

Deleting cakes

Cake Data
A cake contains information such as:


_id
name
description
category
price
availability
image
Database

MongoDB
Database: catalogdb
12. Order Service
The Order Service manages baskets and orders.

Responsibilities
The Order Service provides functionality for:

Adding cakes to the basket

Viewing the basket

Updating basket quantities

Removing basket items

Clearing the basket

Calculating basket totals

Checkout

Creating orders

Maintaining order status

Publishing order completion events

Models
The service contains:


Basket
Order
Database

MongoDB
Database: orderdb
13. Rating Service
The Rating Service manages cake ratings.

Responsibilities
The Rating Service provides functionality for:

Creating ratings

Retrieving ratings

Retrieving ratings for a specific cake

Calculating average ratings

Deleting ratings

Rating Information
A rating contains information such as:


userId
cakeId
rating
comment
createdAt
updatedAt
Database

MongoDB
Database: ratingdb
14. Notification Service
The Notification Service manages order confirmation notifications.

The service communicates asynchronously with the Order Service through RabbitMQ.

Responsibilities
Consume order completion events

Create order confirmation notifications

Store notification records

Retrieve customer notifications

Maintain notification status

Database

MongoDB
Database: notificationdb
15. RabbitMQ Event-Driven Architecture
RabbitMQ is used to decouple the Order Service from the Notification Service.

The event flow is:


Order Service
      |
      | checkout completed
      |
      | publish event
      v
RabbitMQ
      |
      | order.completed
      |
      v
Notification Service
      |
      v
MongoDB
The Order Service does not need to directly call the Notification Service.

This demonstrates asynchronous and event-driven communication.

16. Order Completion Event
The event used by the application is:


order.completed
The Order Service publishes this event after successfully creating an order.

The Notification Service listens for the event.

The event contains order-related information required to generate the notification.

The processing flow is:


Checkout
   |
   v
Order Created
   |
   v
Order Completion Event
   |
   v
RabbitMQ
   |
   v
Notification Consumer
   |
   v
Notification Created
17. Database Architecture
MongoDB is used by the backend services.

The application uses logical database separation.

Microservice	MongoDB Database
Catalog Service	catalogdb
Order Service	orderdb
Rating Service	ratingdb
Notification Service	notificationdb

All services connect to the Kubernetes MongoDB Service:


mongodb:27017
The individual databases are accessed using:


mongodb://mongodb:27017/catalogdb
mongodb://mongodb:27017/orderdb
mongodb://mongodb:27017/ratingdb
mongodb://mongodb:27017/notificationdb
This keeps the data associated with each business capability logically separated.

18. Kubernetes Architecture
The application is deployed using Kubernetes.

Minikube is used as the local Kubernetes cluster.

The application contains the following Kubernetes Deployments:


catalog-service
gateway
mongodb
notification-service
order-service
rabbitmq
rating-service
The following Kubernetes Services are also created:


catalog-service
gateway
mongodb
notification-service
order-service
rabbitmq
rating-service
19. Kubernetes Deployments
Each major component is deployed using a Kubernetes Deployment.

Catalog Service

Deployment: catalog-service
Replicas: 1
Container Port: 3001
Gateway

Deployment: gateway
Replicas: 1
Container Port: 3000
Order Service

Deployment: order-service
Replicas: 1
Container Port: 3002
Rating Service

Deployment: rating-service
Replicas: 1
Container Port: 3003
Notification Service

Deployment: notification-service
Replicas: 1
Container Port: 3004
MongoDB

Deployment: mongodb
Replicas: 1
Container Port: 27017
RabbitMQ

Deployment: rabbitmq
Replicas: 1
Container Ports:
5672
15672
20. Kubernetes Services
Kubernetes Services provide stable network endpoints for Pods.

The following services are configured:

Service	Type	Port
catalog-service	ClusterIP	3001
gateway	NodePort	3000
mongodb	ClusterIP	27017
notification-service	ClusterIP	3004
order-service	ClusterIP	3002
rabbitmq	ClusterIP	5672 / 15672
rating-service	ClusterIP	3003

21. Kubernetes Service Discovery
Kubernetes provides internal DNS-based service discovery.

For example, the Gateway communicates with the Catalog Service using:


http://catalog-service:3001
The Order Service communicates with MongoDB using:


mongodb://mongodb:27017/orderdb
The Order Service communicates with RabbitMQ using:


amqp://rabbitmq:5672
This means that the services do not need to know the individual Pod IP addresses.

If Kubernetes recreates a Pod, the Service name remains stable.

22. Docker Containerization
Docker is used to package each backend microservice.

The project contains Dockerfiles for:


catalog-service
gateway
order-service
rating-service
notification-service
Docker provides:

Consistent runtime environments

Portable application packaging

Isolated service execution

Easier Kubernetes deployment

23. Docker Images
The following application images were built inside the Minikube Docker environment:


cake-catalog-service:1.0

cake-gateway:latest

cake-order-service:latest

cake-rating-service:latest

cake-notification-service:latest
Additional tagged images were also created during development:


cake-gateway:1.0
cake-notification-service:1.0
cake-order-service:1.0
cake-rating-service:1.0
The Kubernetes manifests reference the required application images.

24. Minikube Docker Environment
The application images were built directly inside the Docker environment used by Minikube.

The environment is configured using:

Bash

eval $(minikube docker-env)
The images can then be verified using:

Bash

docker images | grep cake
This approach allows Kubernetes to use locally built images without requiring an external Docker registry.

25. Kubernetes Image Pull Policies
The locally built application images use Kubernetes image pull policies appropriate for the Minikube environment.

For example, services using local images are configured with:


imagePullPolicy: Never
or:


imagePullPolicy: IfNotPresent
This allows Kubernetes to use images already available inside the Minikube Docker environment.

26. Environment Configuration
The application uses environment variables to configure ports, databases, RabbitMQ, and internal service URLs.

Catalog Service

PORT=3001
MONGODB_URI=mongodb://mongodb:27017/catalogdb
NODE_ENV=production
Gateway

PORT=3000
NODE_ENV=production
CATALOG_SERVICE_URL=http://catalog-service:3001
ORDER_SERVICE_URL=http://order-service:3002
RATING_SERVICE_URL=http://rating-service:3003
NOTIFICATION_SERVICE_URL=http://notification-service:3004
Order Service

PORT=3002
MONGODB_URI=mongodb://mongodb:27017/orderdb
RABBITMQ_URL=amqp://rabbitmq:5672
ORDER_COMPLETED_QUEUE=order.completed
CATALOG_SERVICE_URL=http://catalog-service:3001
NODE_ENV=production
Rating Service

PORT=3003
MONGODB_URI=mongodb://mongodb:27017/ratingdb
NODE_ENV=production
Notification Service

PORT=3004
MONGODB_URI=mongodb://mongodb:27017/notificationdb
RABBITMQ_URL=amqp://rabbitmq:5672
ORDER_COMPLETED_QUEUE=order.completed
NODE_ENV=production
27. Frontend Architecture
The frontend is a simple web application created using:


HTML
CSS
JavaScript
The frontend files are:


frontend/
├── index.html
├── style.css
└── app.js
The frontend communicates with the API Gateway rather than directly communicating with individual microservices.

The architecture is:


Browser
   |
   v
Frontend JavaScript
   |
   v
API Gateway
   |
   +----> Catalog Service
   +----> Order Service
   +----> Rating Service
   +----> Notification Service
28. Frontend Functionality
The frontend provides functionality for:

Displaying cakes

Searching cakes

Filtering cakes

Adding cakes to basket

Updating quantities

Removing items

Clearing basket

Checkout

Submitting ratings

Viewing ratings

Viewing notifications

The frontend provides a simple customer-facing interface for demonstrating the backend microservices.

29. Project Directory Structure

cake-delight/
│
├── catalog-service/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   └── cakeController.js
│       ├── middleware/
│       │   └── errorHandler.js
│       ├── models/
│       │   └── Cake.js
│       ├── routes/
│       │   └── cakeRoutes.js
│       └── services/
│           └── cakeService.js
│
├── gateway/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── services.js
│       ├── middleware/
│       │   └── errorHandler.js
│       └── routes/
│           └── proxyRoutes.js
│
├── order-service/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   └── orderController.js
│       ├── messaging/
│       │   └── rabbitmq.js
│       ├── middleware/
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── Basket.js
│       │   └── Order.js
│       ├── routes/
│       │   └── orderRoutes.js
│       └── services/
│           └── orderService.js
│
├── rating-service/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   └── ratingController.js
│       ├── middleware/
│       │   └── errorHandler.js
│       ├── models/
│       │   └── Rating.js
│       ├── routes/
│       │   └── ratingRoutes.js
│       └── services/
│           └── ratingService.js
│
├── notification-service/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   └── notificationController.js
│       ├── messaging/
│       │   └── rabbitmq.js
│       ├── middleware/
│       │   └── errorHandler.js
│       ├── models/
│       │   └── Notification.js
│       ├── routes/
│       │   └── notificationRoutes.js
│       └── services/
│           └── notificationService.js
│
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── style.css
│
├── kubernetes/
│   ├── catalog-service.yaml
│   ├── gateway.yaml
│   ├── mongodb.yaml
│   ├── notification-service.yaml
│   ├── order-service.yaml
│   ├── rabbitmq.yaml
│   └── rating-service.yaml
│
├── .gitignore
└── README.md
30. Installation Prerequisites
The following software is required:

Git

Node.js

npm

Docker

kubectl

Minikube

Verify the installations:

Bash

node --version
npm --version
docker --version
kubectl version --client
minikube version
git --version
31. Running the Project
Step 1 — Navigate to the project
Bash

cd ~/projects/cake-delight
Step 2 — Start Minikube
Bash

minikube start
Step 3 — Verify Minikube
Bash

minikube status
Step 4 — Configure the Docker environment
Bash

eval $(minikube docker-env)
Step 5 — Build the Docker images
Bash

docker build -t cake-catalog-service:1.0 ./catalog-service

docker build -t cake-gateway:latest ./gateway

docker build -t cake-order-service:latest ./order-service

docker build -t cake-rating-service:latest ./rating-service

docker build -t cake-notification-service:latest ./notification-service
Step 6 — Verify images
Bash

docker images | grep cake
Step 7 — Deploy MongoDB
Bash

kubectl apply -f kubernetes/mongodb.yaml
Step 8 — Deploy RabbitMQ
Bash

kubectl apply -f kubernetes/rabbitmq.yaml
Step 9 — Deploy the application services
Bash

kubectl apply -f kubernetes/catalog-service.yaml

kubectl apply -f kubernetes/order-service.yaml

kubectl apply -f kubernetes/rating-service.yaml

kubectl apply -f kubernetes/notification-service.yaml

kubectl apply -f kubernetes/gateway.yaml
Step 10 — Verify Pods
Bash

kubectl get pods
All application Pods should eventually reach:


Running
with:


1/1
containers ready.

32. Verify Kubernetes Deployments
Run:

Bash

kubectl get deployments
Expected deployments:


catalog-service
gateway
mongodb
notification-service
order-service
rabbitmq
rating-service
Check the Gateway image:

Bash

kubectl get deployment gateway \
  -o custom-columns=NAME:.metadata.name,IMAGE:.spec.template.spec.containers[0].image
Check all deployment images:

Bash

kubectl get deployments \
  -o custom-columns=NAME:.metadata.name,IMAGE:.spec.template.spec.containers[0].image
33. Verify Kubernetes Services
Run:

Bash

kubectl get services
The expected services are:


catalog-service
gateway
mongodb
notification-service
order-service
rabbitmq
rating-service
34. Accessing the Gateway
Get the Gateway URL:

Bash

minikube service gateway --url
The returned URL can be stored in a shell variable:

Bash

GATEWAY_URL=$(minikube service gateway --url)
Verify:

Bash

echo "$GATEWAY_URL"
The exact URL depends on the Minikube environment.

35. Gateway Health Check
Run:

Bash

curl -s "$GATEWAY_URL/health"
Expected response:

JSON

{
  "service": "api-gateway",
  "status": "UP"
}
This verifies that the Gateway is running and accessible.

36. Catalog API Testing
Retrieve all cakes:

Bash

curl -s "$GATEWAY_URL/cakes"
The application was verified to return four cake products.

Example products:


Black Forest Cake
Red Velvet Cake
Vanilla Birthday Cake
Chocolate Truffle Cake
37. Catalog Search Testing
Search by cake name:

Bash

curl -s "$GATEWAY_URL/cakes?name=Chocolate"
The API searches the catalog based on the supplied name.

38. Catalog Category Filtering
Example:

Bash

curl -s "$GATEWAY_URL/cakes?category=Birthday"
The API returns cakes belonging to the specified category.

39. Catalog Price Filtering
Example:

Bash

curl -s "$GATEWAY_URL/cakes?minPrice=600&maxPrice=700"
The API returns cakes whose prices fall within the requested range.

40. Basket Testing
The Order Service manages basket operations.

A cake can be added to a customer's basket using the API.

Example:

Bash

curl -s -X POST \
  "$GATEWAY_URL/orders/basket/customer-001/items" \
  -H "Content-Type: application/json" \
  -d '{
    "cakeId": "6a7adbaedf5797ba7e8b793b",
    "quantity": 1
  }'
The response contains the updated basket.

41. View Basket
Example:

Bash

curl -s "$GATEWAY_URL/orders/basket/customer-001"
The basket response contains the customer's selected cakes and calculated totals.

42. Update Basket
The basket quantity can be updated through the Order Service API.

The updated quantity is reflected in the basket total.

43. Remove Basket Item
Individual basket items can be removed through the Order Service.

After removal, the basket is recalculated.

44. Clear Basket
The complete basket can be cleared through the Order Service.

After clearing the basket, the customer has no active basket items.

45. Checkout
Checkout creates an order from the customer's basket.

Example:

Bash

curl -s -X POST \
  "$GATEWAY_URL/orders/checkout/customer-001"
A successful checkout creates an order and publishes the order completion event.

The flow is:


Basket
   |
   v
Checkout
   |
   v
Order Created
   |
   v
order.completed
   |
   v
RabbitMQ
46. Notification Verification
The Notification Service consumes the order completion event.

The notification workflow is:


Order Service
     |
     v
RabbitMQ
     |
     v
Notification Service
     |
     v
MongoDB
A notification can then be retrieved through the Notification Service.

47. RabbitMQ Verification
RabbitMQ is deployed using:


rabbitmq:4-management
The AMQP port is:


5672
The management interface port is:


15672
The queue used by the application is:


order.completed
RabbitMQ queues can be inspected using:

Bash

kubectl exec deployment/rabbitmq -- rabbitmqctl list_queues
48. Rating API Testing
Ratings can be submitted for cakes.

A rating contains:


userId
cakeId
rating
comment
Ratings are stored in:


ratingdb
The Rating Service also provides average rating functionality.

49. Kubernetes Scaling Demonstration
Kubernetes scaling was demonstrated using the Order Service.

Initial configuration:


Order Service replicas = 1
Verify:

Bash

kubectl get pods -l app=order-service
Scale to two replicas:

Bash

kubectl scale deployment/order-service --replicas=2
Monitor the rollout:

Bash

kubectl rollout status deployment/order-service
Verify:

Bash

kubectl get pods -l app=order-service
The deployment successfully created two running Order Service Pods.

After the demonstration, the service was returned to one replica:

Bash

kubectl scale deployment/order-service --replicas=1
Verify:

Bash

kubectl get deployment order-service
Expected:


READY       1/1
UP-TO-DATE  1
AVAILABLE   1
50. Kubernetes Self-Healing Demonstration
Kubernetes self-healing was demonstrated by manually deleting the Order Service Pod.

First, the running Pod was checked:

Bash

kubectl get pods -l app=order-service
The Pod was then deleted:

Bash

kubectl delete pod -l app=order-service
The Deployment automatically created a replacement Pod.

The replacement was verified using:

Bash

kubectl get pods -l app=order-service -o wide
The new Pod reached:


READY   1/1
STATUS  Running
This demonstrates Kubernetes self-healing.

The Deployment controller ensures that the desired number of replicas remains available.

51. Kubernetes Rollout Verification
Deployment rollout status can be checked using:

Bash

kubectl rollout status deployment/order-service
A successful rollout reports:


deployment "order-service" successfully rolled out
This confirms that Kubernetes successfully applied the requested Deployment state.

52. Kubernetes Events
Kubernetes events can be inspected using:

Bash

kubectl get events --sort-by=.lastTimestamp
The events observed during testing included:

Pod scheduling

Container creation

Container startup

ReplicaSet scaling

Pod termination

Replacement Pod creation

These events provide evidence of Kubernetes orchestration behavior.

53. Health and Operational Checks
The following commands can be used to inspect the running application.

Check all Pods:

Bash

kubectl get pods
Check Deployments:

Bash

kubectl get deployments
Check Services:

Bash

kubectl get services
Check Pod details:

Bash

kubectl get pods -o wide
Describe a Deployment:

Bash

kubectl describe deployment order-service
Check events:

Bash

kubectl get events --sort-by=.lastTimestamp
Check logs:

Bash

kubectl logs deployment/order-service
54. Error Handling
Each backend service contains centralized error-handling middleware.

The following file is used by the services:


src/middleware/errorHandler.js
Centralized error handling provides consistent error responses and keeps error-handling logic separate from business logic.

This improves code maintainability and makes debugging easier.

55. Git Version Control
Git is used to maintain the project's source code history.

The project contains the following major commits:


f7e9613 Complete cloud native cake delight microservices
cf2c0a6 Implement catalog CRUD and filtering APIs
f8b903f Create microservices project structure
4aed0e7 Initial project setup
The final implementation was committed using:


Complete cloud native cake delight microservices
The repository was verified using:

Bash

git status
The final working tree was clean after the implementation commit.

56. Git Ignore
The project contains a .gitignore file.

The following types of files are excluded:


node_modules/
.env
*.log
logs/
dist/
build/
coverage/
.vscode/settings.json
.DS_Store
Environment files and dependencies are therefore not included in source control.

57. Testing Summary
The application was tested at multiple levels.

Catalog
Verified:

Cake listing

Cake search

Category filtering

Price filtering

Order
Verified:

Basket creation

Basket modification

Basket item removal

Basket clearing

Checkout

Order creation

Rating
Verified:

Rating submission

Rating retrieval

Average rating calculation

Rating deletion

Notification
Verified:

RabbitMQ event consumption

Notification creation

Notification retrieval

Kubernetes
Verified:

Deployment

Service discovery

Scaling

Rollout

Pod replacement

Self-healing

Gateway
Verified:

Gateway health

Request routing

Catalog access

Order access

Rating access

Notification access

58. End-to-End Customer Workflow
The complete customer workflow is:


                         CUSTOMER
                            |
                            v
                     +-------------+
                     |  FRONTEND   |
                     +------+------+
                            |
                            v
                     +-------------+
                     | API GATEWAY |
                     +------+------+
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
      CATALOG            ORDER             RATING
       SERVICE           SERVICE           SERVICE
          |                 |                 |
          v                 v                 v
      catalogdb          orderdb          ratingdb
                            |
                            |
                       CHECKOUT
                            |
                            v
                     order.completed
                            |
                            v
                        RABBITMQ
                            |
                            v
                  NOTIFICATION SERVICE
                            |
                            v
                    notificationdb
                            |
                            v
                       CUSTOMER
59. Cloud-Native Characteristics
The Cake Delight application demonstrates several cloud-native engineering principles.

59.1 Microservices
Business capabilities are separated into independent services.

59.2 Loose Coupling
Services communicate through APIs and asynchronous events rather than sharing application code.

59.3 Containerization
Services are packaged as Docker images.

59.4 Orchestration
Kubernetes manages application containers.

59.5 Service Discovery
Kubernetes Services provide stable DNS-based endpoints.

59.6 Scalability
The Order Service was successfully scaled from one replica to two replicas.

59.7 Self-Healing
Kubernetes automatically replaced a deleted Order Service Pod.

59.8 Event-Driven Communication
RabbitMQ is used for the order.completed event.

59.9 API Gateway
The Gateway provides a centralized entry point for the frontend.

59.10 Database Separation
Different business services use separate logical MongoDB databases.

60. Evaluation Criteria Mapping
The implementation satisfies the main capstone evaluation areas.

Evaluation Area	Cake Delight Implementation
Microservices Design	Catalog, Order, Rating, Notification services
API Implementation	Node.js and Express.js REST APIs
Event Handling	RabbitMQ order.completed event
Containerization	Dockerfiles and Docker images
Kubernetes Deployment	Kubernetes Deployments and Services
Scalability	Order Service scaled to two replicas
Self-Healing	Kubernetes automatically recreated deleted Pods
Service Discovery	Kubernetes DNS service names
Reliability	Error-handling middleware and Kubernetes management
Maintainability	Layered service structure
End-to-End Demo	Frontend → Gateway → Services → Database/Messaging

61. Project Limitations
The current project is an educational cloud-native implementation running on Minikube.

The following limitations apply:

Minikube is a local Kubernetes environment.

MongoDB currently uses emptyDir storage in the Kubernetes configuration.

Persistent cloud storage is not configured.

Authentication and authorization are not implemented.

Production HTTPS/TLS is not configured.

CI/CD automation is not currently included.

Production monitoring tools such as Prometheus and Grafana are not included.

The application currently uses one replica for most services.

Production-grade secrets management is not implemented.

External email or SMS providers are not integrated.

These limitations are consistent with the current educational scope of the capstone project.

62. Future Enhancements
The following improvements could be implemented in a future production version.

Security
JWT authentication

Role-based authorization

HTTPS/TLS

Kubernetes Secrets

API rate limiting

Kubernetes
Horizontal Pod Autoscaler

Readiness probes

Liveness probes

PersistentVolumes

PersistentVolumeClaims

Multiple replicas

Network policies

Database
Persistent MongoDB storage

MongoDB replica sets

Database backup

Database monitoring

Observability
Prometheus

Grafana

Centralized logging

Distributed tracing

Application metrics

DevOps
GitHub Actions

Automated Docker builds

Container registry

Automated Kubernetes deployment

Automated testing pipeline

Application
User authentication

Customer accounts

Order history

Payment integration

Real email notifications

SMS notifications

Improved frontend design

63. Final Project Status
The Cake Delight application has been implemented as a cloud-native microservices application.

The completed implementation contains:


✓ Catalog Service
✓ Order Service
✓ Rating Service
✓ Notification Service
✓ API Gateway
✓ MongoDB
✓ RabbitMQ
✓ Docker containerization
✓ Kubernetes deployments
✓ Kubernetes services
✓ Minikube environment
✓ Frontend application
✓ REST APIs
✓ Event-driven communication
✓ Database separation
✓ Kubernetes service discovery
✓ Kubernetes scaling demonstration
✓ Kubernetes self-healing demonstration
✓ Git version control
✓ Project documentation
64. Final End-to-End Architecture

                              +-------------------+
                              |      CUSTOMER     |
                              +---------+---------+
                                        |
                                        v
                              +-------------------+
                              |     FRONTEND      |
                              |   HTML/CSS/JS     |
                              +---------+---------+
                                        |
                                        | HTTP
                                        v
                              +-------------------+
                              |    API GATEWAY    |
                              |      :3000        |
                              +---------+---------+
                                        |
                    +-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
             +-------------+     +-------------+     +-------------+
             |   CATALOG   |     |    ORDER    |     |   RATING    |
             |   :3001     |     |    :3002    |     |    :3003    |
             +------+------+     +------+------+     +------+------+
                    |                   |                   |
                    v                   v                   v
             +-------------+     +-------------+     +-------------+
             |  catalogdb  |     |   orderdb   |     |   ratingdb  |
             +-------------+     +-------------+     +-------------+
                                        |
                                        | order.completed
                                        v
                                +---------------+
                                |    RabbitMQ    |
                                |     :5672      |
                                +-------+-------+
                                        |
                                        | consume
                                        v
                              +-------------------+
                              |   NOTIFICATION    |
                              |      :3004        |
                              +---------+---------+
                                        |
                                        v
                              +-------------------+
                              | notificationdb    |
                              +-------------------+
65. Conclusion
Cake Delight demonstrates the development and deployment of a complete cloud-native microservices application.

The project combines Node.js, Express.js, MongoDB, RabbitMQ, Docker, Kubernetes, Minikube, HTML, CSS, JavaScript, and Git.

The architecture separates the main business capabilities into independent services:

Cake Catalog

Order Management

Rating Management

Notification Management

The API Gateway provides centralized access to the backend services.

REST APIs are used for synchronous communication, while RabbitMQ is used for asynchronous order completion events.

Docker provides containerized execution, while Kubernetes provides deployment, service discovery, scaling, and self-healing.

The project also demonstrates an end-to-end business workflow:


Browse Cakes
      ↓
Search / Filter
      ↓
Add to Basket
      ↓
Modify Basket
      ↓
Checkout
      ↓
Create Order
      ↓
Publish order.completed
      ↓
RabbitMQ
      ↓
Notification Service
      ↓
Store Notification
      ↓
Customer Notification
      ↓
Submit / View Rating

# 66. Capstone Requirements Checklist

| Requirement | Implementation | Status |
|---|---|---|
| Microservices architecture | Catalog, Order, Rating, Notification services | Completed |
| REST APIs | Express.js REST APIs | Completed |
| API Gateway | Gateway service on port 3000 | Completed |
| Database persistence | MongoDB with separate logical databases | Completed |
| Message broker | RabbitMQ | Completed |
| Event-driven communication | order.completed event | Completed |
| Docker containerization | Dockerfiles and Docker images | Completed |
| Kubernetes deployment | Kubernetes Deployment and Service manifests | Completed |
| Kubernetes service discovery | Kubernetes DNS service names | Completed |
| Scalability | Order Service scaled from 1 to 2 replicas | Completed |
| Self-healing | Deleted Pod automatically recreated | Completed |
| Frontend | HTML, CSS and JavaScript | Completed |
| End-to-end workflow | Browse → Basket → Checkout → Notification → Rating | Completed |
| Git version control | Git repository and commit history | Completed |
| Documentation | Complete README | Completed |