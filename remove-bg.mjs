import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function main() {
  console.log('Removing background...');
  try {
      const blob = await removeBackground('public/sagar-portrait-new.jpg');
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync('public/sagar-portrait-transparent.png', buffer);
      console.log('Done.');
  } catch (e) {
      console.error(e);
  }
}
main();
