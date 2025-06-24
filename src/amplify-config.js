import { Amplify } from 'aws-amplify';

try {
  const outputs = await import('../amplify_outputs.json');
  Amplify.configure(outputs.default || outputs);
} catch (error) {
  console.warn('amplify_outputs.json not found, Amplify not configured');
}

export default Amplify;