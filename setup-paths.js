const fs = require('fs');
const path = require('path');

console.log('Starting path setup process...');
console.log('Current directory:', process.cwd());

// Make sure the target directories exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    } catch (error) {
      console.error(`Error creating directory ${dirPath}:`, error);
    }
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
};

// List all files in a directory
const listDir = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    console.log(`Files in ${dirPath}:`, files);
  } catch (error) {
    console.error(`Error listing directory ${dirPath}:`, error);
  }
};

// Check if lib directory exists and list its contents
if (fs.existsSync(path.join(process.cwd(), 'lib'))) {
  console.log('lib directory exists');
  listDir(path.join(process.cwd(), 'lib'));
} else {
  console.log('WARNING: lib directory does not exist!');
}

// Check if services directory exists and list its contents
if (fs.existsSync(path.join(process.cwd(), 'services'))) {
  console.log('services directory exists');
  listDir(path.join(process.cwd(), 'services'));
} else {
  console.log('WARNING: services directory does not exist!');
}

// Create the alias directories
const aliasRootDir = path.join(process.cwd(), 'node_modules', '@');
ensureDir(aliasRootDir);

const libTargetDir = path.join(aliasRootDir, 'lib');
ensureDir(libTargetDir);

const servicesTargetDir = path.join(aliasRootDir, 'services');
ensureDir(servicesTargetDir);

// Define source and target paths
const libSourcePath = path.join(process.cwd(), 'lib', 'content-service.ts');
const libTargetPath = path.join(libTargetDir, 'content-service.ts');

const servicesSourcePath = path.join(process.cwd(), 'services', 'content-service.ts');
const servicesTargetPath = path.join(servicesTargetDir, 'content-service.ts');

// Copy the files
try {
  if (fs.existsSync(libSourcePath)) {
    fs.copyFileSync(libSourcePath, libTargetPath);
    console.log(`Copied ${libSourcePath} to ${libTargetPath}`);
  } else {
    console.error(`Source file not found: ${libSourcePath}`);
    
    // Create empty placeholder if source doesn't exist
    fs.writeFileSync(libTargetPath, 
      `// Placeholder file created by setup script
export const getAbout = async () => ({});
export const updateAbout = async () => {};
export const getHero = async () => ({});
export const updateHero = async () => {};
export const getTestimonials = async () => [];
export const updateTestimonials = async () => {};
export const getProjects = async () => [];
export const updateProjects = async () => {};`);
    console.log(`Created placeholder file at ${libTargetPath}`);
  }

  if (fs.existsSync(servicesSourcePath)) {
    fs.copyFileSync(servicesSourcePath, servicesTargetPath);
    console.log(`Copied ${servicesSourcePath} to ${servicesTargetPath}`);
  } else {
    console.error(`Source file not found: ${servicesSourcePath}`);
    
    // Create empty placeholder if source doesn't exist
    fs.writeFileSync(servicesTargetPath, 
      `// Placeholder file created by setup script
export const getProjects = () => [];
export const updateProject = () => {};
export const getTestimonials = () => [];
export const updateTestimonial = () => {};
export const getHero = () => ({});
export const updateHero = () => {};
export const getExperiences = () => [];
export const addExperience = () => {};
export const updateExperience = () => {};
export const getTechStack = () => ({categories: [], additionalSkills: []});
export const updateTechStack = () => {};
export const getSocialMedia = () => [];
export const updateSocialMedia = () => {};
export const getApproach = () => [];
export const updateApproach = () => {};
export const getFooter = () => ({cta: {}, copyright: {}});
export const updateFooter = () => {};`);
    console.log(`Created placeholder file at ${servicesTargetPath}`);
  }
  
  console.log('Path setup completed successfully');
} catch (error) {
  console.error('Error setting up paths:', error);
  process.exit(1);
} 
