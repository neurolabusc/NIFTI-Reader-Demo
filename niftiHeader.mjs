// node niftiHeader.mjs img.nii.gz

import fs from 'fs/promises';
import nifti from 'nifti-reader-js';

// Check if a NIfTI file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: node --experimental-modules niftiHeader.mjs <NIfTI file path>');
  process.exit(1);
}

const niftiFilePath = process.argv[2];

// Read the NIfTI file
async function readNiftiFile() {
  try {
    const buf = await fs.readFile(niftiFilePath);
    let data = (new Uint8Array(buf).buffer);
    if (nifti.isCompressed(data))
        data = nifti.decompress(data);
    // Parse the NIfTI header
    const header = nifti.readHeader(data);
    
    // Display header details
    console.log('NIfTI Header Details:');
    console.log('---------------------');
    console.log('Dimensions:', header.dims);
    console.log('Data Type:', header.datatypeCode);
    console.log('Bit Depth:', header.numBitsPerVoxel);
    console.log('Voxel Dimensions:', header.pixDims);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Call the function to read and report NIfTI header details
readNiftiFile();
