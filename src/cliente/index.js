import express from 'express'

const router = express.Router()

const clientes = [
    { id: 1, nome: 'Cliente 1' },
    { id: 2, nome: 'Cliente 2' },
    { id: 3, nome: 'Cliente 3' }
]

// GET - serve para recuperar os dados de clientes - OK
// GET /:id - serve para recuperar os dados de um cliente específico - OK
// GET /detalhes/:id - serve para recuperar os dados de um cliente específico com a data de pedido dos detalhes - OK

// POST - Serve para criar um novo cliente (com os dados vindo em uma propriedade chamada body) - OK

// PUT /:id - Serve para atualizar os dados do cliente (com os dados vindo em uma propriedade chamada body) - OK

// DELETE /:id - Serve para remover um cliente

function getClienteById(clenteId) {
    const id = parseFloat(clenteId)
    if (isNaN(id)) {
        return res.status(400).json({ error: true, message: 'ID inválido' })
    }
    const cliente = clientes.find(c => c.id === id)
    if (!cliente) {
        return res.status(404).json({ error: true, message: 'Cliente não encontrado' })
    }

    return cliente
}

router.get('/', (req, res) => {
  res.json(clientes)
})

router.get('/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    const cliente = getClienteById(id)
    res.json(cliente)
})

router.get('/detalhes/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    const dadosCleinte = getClienteById(id)
    const cliente = {
        ...dadosCleinte,
        dataHora: new Date().toLocaleString('pt-BR'),
    }

    res.json(cliente)
})

router.post('/', (req, res) => {
    const { nome } = req.body
    const cliente = clientes.find(c => c.nome === nome)
    if (cliente) {
        return res.status(400).json({ error: true, message: 'Cliente já existe' })
    }
    const novoCliente = {
        id: clientes.length + 1,
        nome
    }
    clientes.push(novoCliente)
    res.status(201).json(novoCliente)
})

router.put('/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    const cliente = getClienteById(id)
    const { nome } = req.body
    cliente.nome = nome    
    res.json(cliente)
})

router.delete('/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    const index = clientes.findIndex(c => c.id === id)
    if (index === -1) {
        return res.status(404).json({ error: true, message: 'Cliente não encontrado' })
    }
    clientes.splice(index, 1)
    res.status(204).send()
})

export default router