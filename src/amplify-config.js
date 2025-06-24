/*import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default Amplify;*/

import { Amplify } from 'aws-amplify';

Amplify.configure(globalThis.amplifyOutputs);

export default Amplify;