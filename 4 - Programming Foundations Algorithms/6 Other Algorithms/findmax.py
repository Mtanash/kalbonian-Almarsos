# use a recursive algorithm to find a maximum value


# declare a list of values to operate on
items = [6, 20, 8, 19, 56, 23, 87, 41, 49, 53, 101]


def find_max(items):
    if len(items) == 1:
        return items[0]

    operand1 = items[0]
    operand2 = find_max(items[1:])

    if operand1 > operand2:
        return operand1
    else:
        return operand2


# test the function
print(find_max(items))
