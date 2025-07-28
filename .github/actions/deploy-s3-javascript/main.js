const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {

    //get some input values

    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distFolder = core.getInput('dist-folder', { required: true});

    //upload files
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);   //execute cli aws commands

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`; //Subida de archivos: La acción utiliza la CLI de AWS para sincronizar los archivos de la carpeta de distribución con el bucket de S3. El comando aws s3 sync se ejecuta con los parámetros ${distFolder} y ${s3Uri} (que se construye a partir del nombre del bucket)
    core.setOutput('website-url', websiteUrl);  //::set-outpu   //used to set a value to the output variable in action yml as outputs:   website-url:       description: 'the url of the deployed website'
}

run();