export const getAppConfig = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/app-config`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching app config:", error);
    return {
      logos: {},
      logoUrl: null,
      version: "1.0.0",
    };
  }
};

export const getLogoUrl = async (logoName = null) => {
  try {
    const config = await getAppConfig();

    if (logoName && config.logos && config.logos[logoName]) {
      return config.logos[logoName];
    }

    return config.logoUrl || null;
  } catch (error) {
    console.error("Error getting logo URL:", error);
    return null;
  }
};

export const getAllLogos = async () => {
  try {
    const config = await getAppConfig();
    return config.logos || {};
  } catch (error) {
    console.error("Error getting all logos:", error);
    return {};
  }
};

export const getSpecificLogo = async (logoName) => {
  try {
    const logos = await getAllLogos();
    return logos[logoName] || null;
  } catch (error) {
    console.error(`Error getting logo ${logoName}:`, error);
    return null;
  }
};
