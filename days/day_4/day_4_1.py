
def solve(pairs:list[tuple[str,str]])-> None:
	total:int = 0
	for pair in pairs:
		winners:set[int] = set([int(x) for x in pair[0].split()])
		my_nums:set[int] = set([int(x) for x in pair[1].split()])
		matches:int = len(winners.intersection(my_nums))
		if matches > 0:
			total += 2**(matches-1)
	print(total)



if __name__ == '__main__':
	lines:list[str]
	lines = [line.strip() for line in open("test.txt","r").readlines()]
	pairs:list[tuple[str,str]] = []
	pair:tuple[str,str]
	line:str
	for line in lines:
		pairs.append( (line.split(": ")[1].split(" | ")[0],line.split(": ")[1].split(" | ")[1]))
	solve(pairs)