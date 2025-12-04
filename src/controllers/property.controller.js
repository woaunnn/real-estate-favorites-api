const mockProperties = require('../data/properties');

const getProperties = (req, res) => {
  try {
    let properties = mockProperties;
    res.status(200).json({
      items: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProperties,
};
