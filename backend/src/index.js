const express = require('express')
const { request } = require('express')
const {uuid, isUuid} = require('uuidv4')

const app = express()
app.use(express.json())

const projects = [];

/**
 * Exemplo de middleWare
 * Micros processos que podem intercptar requisições totalmente ou parcialmente 
 * alterando dados 
 * 
 * @tutorial: método para registrar o tempo de execução de cada requisição
 **/ 
function logRequest(request, response, next){
  /**Pegando as informações necessários do request */ 
  const {method, url} = request
  /** Montado a string com o method com o path */
  const logLabel =  `[${method.toUpperCase()}] ${url}`
  console.time(logLabel);
  /** Passando para o próximo processo */
  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
  const { id } =  request.params
 
  if(!isUuid(id)){
    return response.status('400').json({errr: 'Invalid project ID'})
  }
  return next()
}

app.use(logRequest)
//app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
  const {title} = request.query

  // Filtro com o filter
  const result = title
    ? projects.filter(project => project.title.includes(title))
    : projects
  
  return response.json(result)
})

app.post('/projects', (request, response) => {
  const {title, owner} = request.body
  //Gerando um Id para o projeto com uuidv4 e 
  //montando o novo projeto
  const project = {id: uuid(), title, owner}
  //Adicionando o projeto no array de projetos
  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', validateProjectId, (request, response) => {
  const {id} = request.params
  const {title, owner} = request.body

  //Pegar a posição do array que possui o id do parametro, caso contrário -1
  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete('/projects/:id',validateProjectId, (request, response)=>{
  const {id} = request.params
  //Pegar a posição do array que possui o id do parametro, caso contrário -1
  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return response.status('400').json({error: 'Project not found'})
  }
  
  projects.splice(projectIndex,1)
  return response.status('204').send()
})

app.listen(3333, ()=>{
  console.log('✔ Back-end started!')
})