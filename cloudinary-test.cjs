const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary dengan credentials real
cloudinary.config({
  cloud_name: 'dcymhx2az',
  api_key: '583991669627568',
  api_secret: 'rxWGjYxPf7flIeGfFRoz_HW04PA'
});

// DEMO : Upload sample image dari Cloudinary demo domain
async function run() {
  try {
    // 1. Upload gambar sample
    console.log('Uploading sample image...');
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample',
      { public_id: 'sample_upload_demo' }
    );
    console.log('Uploaded!');
    console.log('Secure URL:', result.secure_url);
    console.log('Public ID:', result.public_id);

    // 2. Get metadata gambar
    console.log('\n--- Image Metadata ---');
    console.log('Width:', result.width, 'px');
    console.log('Height:', result.height, 'px');
    console.log('Format:', result.format);
    console.log('File Size:', result.bytes, 'bytes');

    // 3. Generate transformed URL dengan f_auto & q_auto
    // f_auto = automatic format selection (pilih format optimal, misal WebP jika browser support)
    // q_auto = automatic quality optimization (kompresi visual tanpa mengurangi kualitas persepsi)
    const transformedUrl = cloudinary.url(result.public_id, {
      f_auto: true,
      q_auto: true,
      secure: true
    });

    console.log('\n--- Optimized Image ---');
    console.log('Transformed URL (f_auto + q_auto):', transformedUrl);
    console.log('\nDone! Click link below to see optimized version of the image. Check the size and the format.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
