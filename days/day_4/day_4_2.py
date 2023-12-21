
def solve(pairs:list[tuple[str,str]])-> None:
	total:int = 0
	instances:dict[int,int] = {1:1}
	idx:int
	for idx,pair in enumerate(pairs):
		instances[idx+1] = instances.get(idx+1, 1)
		winners:set[int] = set([int(x) for x in pair[0].split()])
		my_nums:set[int] = set([int(x) for x in pair[1].split()])
		i:int
		
		matches:int = len(winners.intersection(my_nums))
		for i in range(1,matches+1):
			instances[idx+1+i] = instances.get(idx+1+i,1) + instances.get(idx+1,1)
	

			
		
	print(instances)
	print(sum(instances.values()))



if __name__ == '__main__':
	lines:list[str]
	lines = [line.strip() for line in open("input.txt","r").readlines()]
	pairs:list[tuple[str,str]] = []
	pair:tuple[str,str]
	line:str
	for line in lines:
		pairs.append( (line.split(": ")[1].split(" | ")[0],line.split(": ")[1].split(" | ")[1]))
	solve(pairs)