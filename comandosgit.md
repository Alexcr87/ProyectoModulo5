Git branch “nombre de rama” : crea la rama
Git Branch : muestra las ramas
Git checkout “nombre de rama”: Cambia de rama
Git Branch -m “nombre de rama: Cambia el nombre de la rama hay que estar posicionado en la que se que quiere modificar
Git Branch -d “nombre de rama”: Elimina la rama solamente en el local del remoto no se elimina
Git merge “rama a fusionar” : pararse en la rama development, fusiona la rama que desea con la development
Git push -u origin “nombre de la rama”: sube la rama local al remoto
Git branch -a: te muestra las ramas que hay en remoto

Cuando uno termina de modificar el archivo hace git add "nombre de archivo"
git commit -m "commit"
git push -u origin "nombre de rama" si es la primera vez q se hace un push

Después de fucionar la rama que quieren con la development hay que hacer un push para que se suban al repositorio romoto porque solamente se esta fucionando en el local
una vez hecho el push abran https://github.com/Alexcr87/ProyectoModulo5 y les va a aparecer para hacer un pull request 
CUIDADO CUANDO CREAN EL PULL REQUEST EN BASE HAY QUE PONER DEVELOPMENT PORQUE SINO SE HACE EL MERGE A MAIN!!!!!!!!!!
una vez hecho eso TODOS!!!! tenemos que hacer pull en nuestra terminal de vsc de la rama development