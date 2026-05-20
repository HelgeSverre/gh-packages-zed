# Zed ext for niva

## Install
### niva
The language itself  
`git clone https://github.com/gavr123456789/Niva`  
`./gradlew buildJvmNiva` from folder (takes ~2 min to build from scratch because gradle)  
### vaLSe (niVA Language Server)
`git clone https://github.com/gavr123456789/vaLSe.git`  
`./gradlew installDist` from folder (10 sec)  

### This extension
1) git clone https://github.com/gavr123456789/zed-niva.git
2) open Extensions(Ctrl + Shift + X)
3) press "Install Dev Extension" button from top right corner
4) select this folder and wait 30 sec
You should see this:
![image](https://github.com/user-attachments/assets/693d6dec-3beb-494f-85d1-90116f29865d)


### Demo

![image](https://github.com/user-attachments/assets/ce9de880-75a8-4870-8bc6-0601048bc14b)

# For me
To update grammar 
1) update it there https://github.com/gavr123456789/tree-sitter-niva
2) push
3) update the commit sha here in extension.toml
