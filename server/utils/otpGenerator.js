const generateCode = () => {
    let id = ''
    id += String(Math.random()).slice(2, 8)
    return id
}

module.exports = generateCode;