echo > .nojeckyll

git int
git checkout -B main
git add -A
git commit -m 'deploy'

cd ~
