# Compilar la imagen FrontEnd
docker build -t demok8-frontend:latest ./FrontEnd

# Ejecutar container FrontEnd
docker run -p 5001:5001 -e "NODE_ENV=docker" -e "BACKEND_URL=http://localhost:5000" --name demok8-frontend demok8-frontend

# Compilar la imagen de BackEnd
docker build -t demok8-backend:latest ./BackEnd

# Ejecutar container BackEnd
docker run -p 5000:5000 --name demok8-backend demok8-backend

# Borrar todos los containers inactivos
docker rm $(docker ps -a -q)

# Borrar todas las images sin taggear
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

# Borrar todas los contenedores
docker rm -f $(docker ps -a | grep "^demok8" | awk "{print $3}")

# Push
export DOCKER_ID_USER="fvoncina"
docker login
docker tag demok8-backend:latest fvoncina/demok8-backend:latest
docker push fvoncina/demok8-backend:latest
docker tag demok8-frontend:latest fvoncina/demok8-frontend:latest
docker push fvoncina/demok8-frontend:latest

# Login de azure 
az login

# Lista subscriptions
az account list --output table

# Setea subs en contexto
az account set --subscription f38f777e-1001-4f3c-818d-018e4eb4eba3

# Instalar el cliente kubectl
az aks install-cli

# Obtener credenciales
az aks get-credentials --resource-group demo-neo --name demo-neo

# Lista los nodos
kubectl get nodes

