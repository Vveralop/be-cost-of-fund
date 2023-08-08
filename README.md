# Name
cost-of-fund

# NestJS Template

Chassis structure for development

# Overview


## Itau.Cl.[BCL/BFF].[BIAN Bussines domain].[Service]

| Atributo | Valor |
| ------------- | ------------- |
| **Nombre**  | [Service name]  |
| **AWS Account**  | [AWS Account]  |
| **K8s ClusterName**  | [K8s ClusterName]  |
| **K8s Namespace**  | [K8s Namespace]  |
| **Development Language**  | Typescript  |
| **Framework Name**  | NestJS  |
| **Framework Version**  | 9  |
| **MS Type (Dominant Pattern BCL, BFF, MFront)**  | BCL / BFF / MFront Replace |
| **Bian Business Domain**  | [Example] CurrencyExchange  |
| **Bian Service Domain**  | [Example] Consumer Services |
| **Owner TI**  | [Example] Arquitectura TI  |
| **Descripción**  | [Example] Proyecto de ejemplo de aplicación que puede ser usada como referencia para implementar microservicios BCL y BFF. Ha sido desarrollada con .net 6 y c# 9, y se habilitan las siguientes implementaciones  <br> 1. Documentación Code First to OpenAPI. Usando Swashbuckle.AspNetCore <br> 2. HttpClient para invocación de APIs en API Connect. <br> 3. Hosting sobre AWS Serverless Lambda. Amazon.Lambda.AspNetCoreServer.Hosting. https://aws.amazon.com/blogs/compute/introducing-the-net-6-runtime-for-aws-lambda/ <br> 4. Implementacion de Logs patterns.  |

# Technical documentation
#### Ejemplo de implementación de aplicación contenerizada compatible para despliegue sobre Local, ECS, EKS y Lambda Serverless.

[EXAMPLE] 

Proyecto de ejemplo de aplicación que puede ser usada como referencia para implementar microservicios BCL y BFF. Ha sido desarrollada con .net 6 y c# 9, y se habilitan 
las siguientes capacidades base:

1. Documentación Code First to OpenAPI. Usando Swashbuckle.AspNetCore
2. HttpClient para invocación de APIs de API Connect. 
3. Hosting sobre AWS Serverless Lambda. Amazon.Lambda.AspNetCoreServer.Hosting. https://aws.amazon.com/blogs/compute/introducing-the-net-6-runtime-for-aws-lambda/
4. Implementacion de Logs patterns.

Compilación y Hosting:

El proyecto incluye un DockerFile que permite compilar un container image sobre linux (https://mcr.microsoft.com/v2/dotnet/aspnet/tags/list). Que puede ser hosteado 
localmente con docker, Kubernetes, EKS o Lambda Serverless as Container.

---
[EXAMPLE]

Lambda Hosting.

Lambda requiere un handler para levantar la aplicación, en nuestra arquitectura las exposiciones son a traves de Api Gateway de API Connect. Para disponibilizar las APIs 
del controller, se usa el ApplicationLoadBalancer Handler, que es configurado usando "builder.Services.AddAWSLambdaHosting(LambdaEventSource.ApplicationLoadBalancer)" al iniciar la aplicación. 

Configuración de Hostin en AWS Console.

Para configurar correctamente la aplicacion, luego de crear el Lambda y usar la imagen cargada previamente en ECR, se debe configurar el valor de CMD (https://docs.aws.amazon.com/lambda/latest/dg/configuration-images.html?icmpid=docs_lambda_help), con el nombre del Assembly de la aplicación, por ejemplo "Itau.Cl.ProjectName.Bff.TemplateLambda.dll".

Done! Con esto, tendremos nuestra aplicación hosteada como Serverless en AWS Lambda.




--- 
[EXAMPLE]

Benchmarks

Se realizan pruebas desplegando sobre EKS con un deployment de 1 replica, para probar el tiempo, TPS, fallas y consumo de recurso por cada replica.

1 - Con Environment modo "Development" el cual escribe el payload del request (no optimizado para producción, o solo activado en modo debug para identificar problemas por incidencia)>

    >k get hpa -A
    NAMESPACE                             NAME                         REFERENCE                               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
    workshop-currencyexchangemanagement   currencyexchangemanagement   Deployment/currencyexchangemanagement   0%/75%    1         1         2          28d

    >k get hpa -A
    NAMESPACE                             NAME                         REFERENCE                               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
    workshop-currencyexchangemanagement   currencyexchangemanagement   Deployment/currencyexchangemanagement   0%/75%    1         1         1          28d

    >k get pods -n workshop-currencyexchangemanagement
    NAME                                          READY   STATUS    RESTARTS      AGE
    currencyexchangemanagement-7879f97448-dtd6k   1/1     Running   8 (12m ago)   15h
    redis-9cb776ccc-6wstk                         1/1     Running   0             120d

    >k top pods -n workshop-currencyexchangemanagement
    NAME                                          CPU(cores)   MEMORY(bytes)
    currencyexchangemanagement-7879f97448-dtd6k   2m           65Mi
    redis-9cb776ccc-6wstk                         2m           5Mi



# Implementación de SecretProviderClass para integración con el Secret Manager.

## Consideraciones:

[EXAMPLE]

1 - Se debe tener instalado ya en cluster el CSI Driver AWS Secret.

2 - Tener el ASCP de CSI Driver Secert provider AWS instalado en el cluster.

3 - Debe existir el Namespace de la comunidad ya creado para desplegar el SecretProviderClass.

4 - El EKS debe tener accesos por VPC endpoint al SecretManager.

5 - Tener el OIDC provider asociado al cluster.

En caso de no tener el CSI Driver AWS Secret>

Agregar chart repo de secrets-store-csi-driver>
    
    helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts

Instalar el CSI driver>

    helm upgrade --install -n kube-system csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver --set syncSecret.enabled=true --set enableSecretRotation=true --debug

Instalar el ASCP>

    kubectl apply -f https://raw.githubusercontent.com/aws/secrets-store-csi-driver-provider-aws/main/deployment/aws-provider-installer.yaml

Comprueba que se realizó la instalación>
    
    kubectl get daemonsets -n kube-system -l app=csi-secrets-store-provider-aws
    kubectl get daemonsets -n kube-system -l app.kubernetes.io/instance=csi-secrets-store
    
## Pasos para implementación manual

[EXAMPLE]

### 1 - Autenticarse al cluster EKS desde CLI.
### 2 - Establecer variables de entorno para el EKS cluster:

    export EKS_CLUSTERNAME="Nombre de Cluster EKS"
    export AWS_REGION="Region de AWS"
    export NAMESPACE_DEPLOYMENT="Namespace Kubernetes"
    export DEPLOYMENT_NAME="Nombre del deployment, debe ser minuscula RFC1123" 
    export SECRET_NAME="{Reemplazar por nombre de secreto, en contexto completo}"
    export KMS_ACCOUNT_ID="{Cuenta AWS donde se encuentra el KMS}"
    export KMS_ARN_Encrypt="{ARN KMS de cuenta de seguridad}"

Ejemplo (No funcionará en despliegues reales, solo uso de referencia para Demo/Workshops):

    export EKS_CLUSTERNAME="POC-Architecture-eks"
    export AWS_REGION="us-east-1"
    export NAMESPACE_DEPLOYMENT="workshop-currencyexchangemanagement"
    export DEPLOYMENT_NAME="currencyexchange"
    export SECRET_NAME="APIKey/des/inner/acl/apiconnect"
    export KMS_ACCOUNT_ID="975842041944"
    export KMS_ARN_Encrypt="arn:aws:kms:us-east-1:975842041944:key/4f23e48d-5a79-46be-b835-c78be4ce36a9"

### 2 - Crear secreto en caso de que no exista

    aws --region "$AWS_REGION" secretsmanager \
    create-secret --name "$SECRET_NAME" \
    --secret-string '{"clientid":"pfgFctTvFbNIdApqsc", "clientsecret":"hdAlqYSds34-super-sekret"}' --kms-key-id "$KMS_ARN_Encrypt"

### 3 - Establecer el arn del secreto en variable de entorno:

    SECRET_ARN=$(aws --region "$AWS_REGION" secretsmanager \
        describe-secret --secret-id  "$SECRET_NAME" \
        --query 'ARN' | sed -e 's/"//g' )

    echo $SECRET_ARN


### 4 - Crear politica para dar acceso al secret ARN

    IAM_POLICY_NAME_SECRET=$NAMESPACE_DEPLOYMENT"_"$DEPLOYMENT_NAME"-sa_policy"
    IAM_POLICY_ARN_SECRET=$(aws --region "$AWS_REGION" iam create-policy --query Policy.Arn --output text --policy-name $IAM_POLICY_NAME_SECRET \
        --policy-document '{  
            "Version": "2012-10-17",  
            "Statement": [ 
                {  
                    "Effect": "Allow",  
                    "Action": [ 
                        "secretsmanager:GetSecretValue", 
                        "secretsmanager:DescribeSecret" 
                    ], 
                    "Resource": [ 
                        "'"$SECRET_ARN"'"
                    ] 
                }, 
                { 
                    "Sid": "AllowKMSDecrypt", 
                    "Effect": "Allow", 
                    "Action": [ 
                        "kms:Decrypt",
                        "kms:DescribeKey"
                    ], 
                    "Resource": "'"$KMS_ARN_Encrypt"'"
                }
            ] 
        }')

    echo $IAM_POLICY_ARN_SECRET | tee -a 00_iam_policy_arn_secret_"$SECRET_NAME"

### 5 - Create a Service Account with IAM role in NS of deployment

    eksctl create iamserviceaccount \
        --region="$AWS_REGION" --name "$DEPLOYMENT_NAME-sa"  \
        --cluster "$EKS_CLUSTERNAME" \
        --attach-policy-arn "$IAM_POLICY_ARN_SECRET" --approve \
        --override-existing-serviceaccounts \
        --namespace="$NAMESPACE_DEPLOYMENT"

### 6 - Comprobar sincronización de secrets sin error

    kubeclt logs -n kube-system -f -l app=secrets-store-csi-driver

# Ambiente develop database
Se usa para temas de desarrollos con base de datos, para el ejemplo: **Imagen Postgres dentro de contenedor docker**

Teniendo en cuenta que se debe tener instalado docker, correr el siguiente comando para levantar la imagen con usuario y contraseña a gusto y puerto expuesto

    docker run -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -p 5432:5432 postgres

Por ultimo en el archivo .env agregar la variable de entorno

    DATABASE_URL="postgresql://[user]:[password]@[localhost:port]/[database]?schema=[schema]"

Ejemplo:

    DATABASE_URL="postgresql://postgres:admin321@localhost:5432/postgres?schema=public"

# Habilitacion de Prisma

Con una variable de entorno DATABASE_URL valida, abrir una terminal, a la altura de la raiz del proyecto, para inicializar las migraciones a partir del esquema que se encuentra en ```[raiz-del-proyecto]/prisma/schema.prisma``` tener en cuenta lo siguiente:

Instalar si no se tiene instalado prisma 

```bash
    npm install prisma --save-dev
```

Instalar el CLI de prisma

```bash
    npm install @prisma/client
```

Para inicializar prisma
```bash
    #genera directorio prisma
    npx prisma init
```

Hacer la primera migracion

```bash
    npx prisma migrate dev --name init
```

### En caso de traer una BD existente

Una vez definida la conexion a base de datos, correr el siguiente comando 

```bash
    #trae el modelo a partir de la base de datos
    npx prisma db pull
```

```bash
    #crea el schema y disponibiliza las interfaces
    npx prisma generate
```

### Para finalizar la configuracion

Una vez creado el esquema de prisma, ya sea haciendo un pull de base de datos o un migrate en VSC es necesario reiniciar el servidor de typescript, porque el lector de la libreria no se actualiza en tiempo real.


Esto se hace de la siguiente manera:
1. Posicionarse dentro de un archivo ```.ts```

2. Abrir la terminal de comandos
```Ctrl+shift+P```

3. Luego buscar el comando ```TypeScript: Reload project```

# Swagger

Swagger queda habilitado en la siguiente ruta [host]:[port]/swagger. Este se configura en el archivo ```src/main.ts``` Ejemplo base:

```bash
    localhost:3000/swagger
```

# Conversion OpenApi 3.0 a 2.0
Primero Instalar libreia que pasa open-api 3 a swagger 2

    npm install -g api-spec-converter 

Posterior

    api-spec-converter --from=openapi_3 --to=swagger_2 --syntax=yaml --order=alpha http://localhost:8095/swagger-json > OutputFile.yaml
"# chassis-nestjs-main" 
