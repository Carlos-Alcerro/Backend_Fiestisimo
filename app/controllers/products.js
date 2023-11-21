const Product = require('../models/products');

//! Controlador para registrar nuevos productos
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const ext = req.file.originalname.split('.').pop();
    
    // Construye la ruta completa de la imagen
    const imagePath = `http://localhost:3000/images/file-${name.replace(/\s+/g, '_')}.${ext}`;

    // Verifica si el producto existe 
    const existingProduct = await Product.findOne({ where: { name } });

    if (existingProduct) {
      return res.status(400).json({ error: 'El producto ya está registrado.' });
    }

    // Crea un nuevo producto
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: imagePath,
      category,
    });

    res.status(201).json({ message: "Producto registrado exitosamente", newProduct });
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//! Controlador para obtener todos los productos sin importar la categoría
exports.getAllProducts = async (req, res) => {
  try {
    // Obtiene todos los productos
    const products = await Product.findAll();

    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos.' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Parece haber un problema al obtener todos los productos.' });
  }
};

//! Controlador para obtener todos los productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Obtiene todos los productos que pertenecen a la categoría
    const products = await Product.findAll({ where: { category } });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos en la categoría especificada.' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({ error: 'Parece haber un problema con la categoria.' });
  }
};

//! Controlador para obtener detalles de un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca el producto por su ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'No se encontró un producto con el ID especificado.' });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);
    res.status(500).json({ error: 'Parece haber un problema al obtener detalles del producto.' });
  }
};

//! Controlador para editar un producto por su ID
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(id);
    console.log(req.params);
    const { name, description, price, category } = req.body;
    console.log(req.body);

    // Verifica si el ID y al menos uno de los campos a editar están definidos
    if (!id) {
      return res.status(400).json({ error: 'Se requiere el ID del producto.' })
    }else if (!name && !description && !price && !category) {
      return res.status(400).json({ error: 'Se requiere el ID del producto y al menos un campo para editar.' });
    }

    // Busca el producto por su ID
    const product = await Product.findByPk(id);

    // Verifica si el producto existe
    if (!product) {
      return res.status(404).json({ message: 'No se encontró un producto con el ID especificado.' });
    }

    // Realiza las ediciones 
    if (name === product.name){
      return res.json({message:'Estas editando el nombre de un producto al que tenia anteriormente.'})
    }else if(name) product.name = name;
    

    if (description) {
      const words = description.split(' ');
      if (words.length < 3) {
        return res.status(400).json({ error: 'La descripción debe contener al menos 3 palabras.' });
      }
      product.description = description;
    }

    if (price <=0) {
      return res.status(400).json({message:'El precio introducido no debe ser 0.'})}
      else if(price >=0){
        product.price = price};

    if (category) {
      const validCategories = ['Postres', 'Desayunos', 'Pasteles', 'Arreglos'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'La categoría proporcionada no es válida.' });
      }
      product.category = category;
    }

    // Guarda los cambios
    await product.save();

    res.status(200).json({ message: 'Producto editado exitosamente', editedProduct: product });
  } catch (error) {
    console.error('Error al editar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//! Controlador para eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 

    // Verifica si el ID está definido
    if (!id) {
      return res.status(400).json({ error: 'Se requiere el ID del producto para eliminarlo.' });
    }

    // Busca el producto por su ID
    const product = await Product.findByPk(id);

    // Verifica si el producto existe
    if (!product) {
      return res.status(404).json({ message: 'No se encontró un producto con el ID especificado.' });
    }

    // Elimina el producto de la base de datos
    await product.destroy();

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//! Controlador que muestra los productos mas baratos
exports.getLowestPriceProducts = async (req, res) => {
  try {
    // 15 Productos con precios mas bajos
    const products = await Product.findAll({
      order: [['price', 'ASC']],
      limit: 15,
    });

    // Verifica si se encontraron productos
    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos.' });
    }

    // Devuelve los productos encontrados
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error al obtener los productos con precios más bajos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



