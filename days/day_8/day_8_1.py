class Node:
    def __init__(self, id:str, left:str, right:str) -> None:
        self.id:str = id
        self.left:str = left
        self.right:str = right
    

def solve(directions:str, lines:list[str])-> None:
    # init nodes
    nodes:dict[str,Node] = {}
    line:str
    for line in lines:
        this_node:str = line[0:3]
        left:str = line[7:10]
        right:str = line[12:15]
        node:Node = Node(this_node,left,right)
        nodes[this_node] = node
    
    # now solve
    direction:str
    idx:int = 0
    cur_node:Node = nodes['AAA']

    while cur_node.id != 'ZZZ':
        next_dir:str = directions[idx%len(directions)]
        next_node:Node = nodes[cur_node.left] if next_dir=="L" else nodes[cur_node.right]
        print(f'direction: {next_dir}, next_node: {next_node.id}')
        idx+=1
        cur_node = next_node
    print(idx)



if __name__ == '__main__':
    lines:list[str]
    line:str
    lines = [line.strip() for line in open("input.txt","r").readlines()]
    directions:str = lines[0]
    solve(directions, lines[2:])