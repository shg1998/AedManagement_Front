event=$1
lastCommit=$2
mergeCommit=$3
beforelastCommit=$4

MSG=""
#Global Error
ERR=0
#Local Error
err=0

if [ "$event" == "merge_request_event" ];then
        echo "this is merge request"
        # This is a squashed merge request in this project
        beforelastCommit=$(git log -2 --format=format:"%H" | tail -n 1) 
fi

echo -e "\n"
echo "Checking commits between these two..."
echo $lastCommit
echo $beforelastCommit

for commit in $(git log $beforelastCommit..$lastCommit|grep ^commit|cut -d ' ' -f2); do
        commit_msg=$(git log -1 --pretty=%B $commit)
        echo -e "Commit message:\n$commit_msg"
        echo -e "\nThe Result is:"
        if [ $(echo $commit_msg | grep -E "^Merge branch.*" | wc -l) -lt 1 ]
        then
                #checking the Title part
                commit=$(echo $commit_msg | grep -Eo 'Title:[[:space:]]*([[:alnum:]]|[[:space:]])+')
                if [ $(echo $commit | grep -E 'Title:[[:space:]]*([[:alnum:]]|[[:space:]]){2,80}$' | wc -l) -lt 1 ];then
                        MSG=" $MSG \e[31mYou Need Title: at the first line of your commit (Max=80 chars).\e[0m\n" 
                        err=1
                fi  

                #checking the Description part
                commit=$(echo $commit_msg | grep -Eo 'Description:[[:space:]]*([[:alnum:]]|[[:space:]])+')      
                if [ $(echo $commit | grep -E '^Description:[[:space:]]*([[:alnum:]]|[[:space:]]){2,200}$' | wc -l) -lt 1 ];then
                        MSG=" $MSG \e[31mYou Need Description: in your commit. (Max=200 chars)\e[0m\n"
                        err=1
                fi                        
                
                #checking the Type part
                commit=$(echo $commit_msg | grep -Eo 'Type:[[:space:]]*([[:alnum:]]|[[:space:]])+')
                if [ $(echo $commit | grep -E '^Type:[[:space:]]*(feat|fix|bug|docs|style|refactor|test|merge)$' | wc -l) -lt 1 ];then
                        MSG=" $MSG \e[31mYou Need Type: in your commit including (feat|fix|bug|docs|style|refactor|test|merge)\e[0m\n"
                        err=1
                fi                        
                
                #checking the Scope part
                if [ $(echo $commit_msg | grep 'Scope:[[:space:]]*[[:alnum:]]' | wc -l) -lt 1 ];then
                        MSG=" $MSG \e[31mYou Need Scope: in your commit. for example (master) or (developer) or (guest)\e[0m\n"
                        err=1
                fi                        
                
                #checking the Jira part
                if [ $(echo $commit_msg | grep -E 'Jira:[[:space:]]*[[:alpha:]]{2,10}-[[:digit:]]{1,5}' | wc -l) -lt 1 ];then
                        MSG=" $MSG \e[31mYou Need Jira: in your commit with jira issue format.\e[0m\n" 
                        err=1
                fi                        
                
        else
                MSG="\n\e[32mThis is a Merge Request.\e[0m";
                echo -e "$MSG";
                err=0
        fi                

        if [ $err -ne 0 ]
        then
                MSG="\e[31mCheck the following....\e[0m \n$MSG"
                #MSG="$MSG \n\e[31mCommit massages must satisfy the following format at the end of the message!\e[0m"
                echo -e "\n$MSG";
                ERR=1
                err=0
        else
                echo -e "\n\e[32mThis is a correct commit message.\e[0m";
                #ERR=0
        fi

        MSG=""
done

#Flag the exit error
if [ $ERR -ne 0 ]
then
        echo -e "\n\n\e[32mThe commit messages must follow the format bellow\e[0m";
        echo -e "\n\e[32m----------------------------------------------------------------------------------\e[0m";
        cat ./CI-CD/commitMessageTemplate.txt 
        exit 1
else
        exit 0        
fi