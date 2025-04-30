node(env["NODE"]){
// node("shery"){
	properties([
		buildDiscarder(
			logRotator(
				numToKeepStr: "10")
		),
		disableConcurrentBuilds()
	])

    def gitCredentialID="git-credential";
	def gitBranch=env["BRANCH"].tokenize('/')[-1];
	def gitURL = "git@gitlab.kashef.ir:sata/sata_frontend.git"

    def repo_name="gitlab.kashef.ir:5050/sata/sata_frontend/"+gitBranch
    def site_name="sata_front"
    def tag="latest"
    def theURL="https://fs-isac.kashef.ir"

    if ( env["TEST"] == 'true' )
    {
        repo_name=repo_name+"-test"
        theURL="https://fs-isactest.kashef.ir"
    }

    def baseUrlDev=theURL+"/api/"

    currentBuild.description = site_name + " is building..."

    stage("Prebuild"){

        checkout([$class: 'GitSCM',
            branches: [[name: '*/'+gitBranch]],
            extensions: [[$class: 'LocalBranch', localBranch: gitBranch],
                        [$class: 'CloneOption', depth: 1, noTags: false, reference: '', shallow: false, timeout: 20]],
            userRemoteConfigs: [[credentialsId: gitCredentialID, url: gitURL]]])//end of checkout
    }

    stage("Creating docker images"){
        withEnv(['REPO_NAME='+repo_name, 'TAG='+tag, 'REBUILD='+env["REBUILD"], 'BASE_URL_DEV='+baseUrlDev])
        {
            sh("/bin/bash $WORKSPACE/build.sh")
        }
    }

    stage("Pushing docker images"){

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'git-credential', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME']])
        {
            withEnv(['PASSWORD='+PASSWORD, 'USERNAME='+USERNAME, 'REPO_NAME='+repo_name, 'TAG='+tag])
            {
                def err = sh(script:"/bin/bash $WORKSPACE/push.sh",returnStatus: true)
                if (err != 0)
                {
                    currentBuild.description = "Somthing wrong in push function. "
                    currentBuild.result = "UNSTABLE"
                }
            }
        }
    }

    stage("Deploy docker images"){
        if (env["DEPLOY_IMAGE"] == 'true'){
            print("Waiting for deploying the front....")
            print("Running sata/sata-backend job")

            if ( gitBranch == "master" )
                main_branch = 'master'
            else
                main_branch = 'develop'

            if ( repo_name.contains("-test") )
                is_test = true
            else
                is_test = false

            build job: 'sata/sata-backend', parameters: [string(name: 'NODE', value: env["NODE"]), booleanParam(name: 'UPDATE_UPSTREAM', value: false), gitParameter(name: 'BRANCH', value: main_branch), string(name: 'SERVICE_NAME', value: 'Nginx'), string(name: 'SUBMODULE_BRANCH', value: gitBranch), booleanParam(name: 'OPERATIONAL', value: false), booleanParam(name: 'TEST', value: is_test), string(name: 'SERVICE', value: 'start')]
        }else{
            print("Skip deploying the built image.")
        }

    }
    // theURL = sh(script:"ip route get 8.8.8.8 | awk -F\"src \" 'NR==1{split(\$2,a,\" \");print a[1]}'",returnStdout: true)
    println ("Check the sit on <a href="+theURL.trim()+"/login>The Site</a>")
    currentBuild.description = site_name + " is ready: Check the sit on <a href="+theURL.trim()+"/login>The Site</a>"
}
