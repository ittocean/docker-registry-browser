import axios from 'axios';
import to from '../utils/to';

const REGISTRY_SECURED = (process.env.VUE_APP_REGISTRY_SECURED || 'false') === 'true';
const REGISTRY_ADDRESS = process.env.VUE_APP_REGISTRY_ADDRESS || 'localhost:5000';

export default {
    async getImageData(selected) {
        const url = `${REGISTRY_SECURED ? 'https' : 'http'}://${REGISTRY_ADDRESS}/v2/${selected}`;
        const listResponse = await axios.get(`${url}/tags/list`);
        const promises = listResponse.data.tags.map(t => {
            return (async () => {
                const [err, tagResponse] = await to(axios.get(`${url}/manifests/${t}`));
                return {
                    tag: t,
                    data: err ? null : tagResponse.data
                };
            })();
        });
        const results = await Promise.all(promises);
        const userName = listResponse.data.name.split('/')[0];
        const imageName = listResponse.data.name.split('/')[1];
        const tags = results
            .map(t => {
                const tag = {tag: t.tag};
                if (t.data) {
                    const comp = JSON.parse(t.data.history[0].v1Compatibility);
                    tag.id = comp.id.substring(0, 12);
                    tag.created = new Date(comp.created).toLocaleString();
                    tag.dockerVersion = comp.docker_version;
                }
                return tag;
            });
        return {userName, imageName, tags};
    }
}