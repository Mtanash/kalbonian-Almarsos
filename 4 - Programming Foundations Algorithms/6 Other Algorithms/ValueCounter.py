# using a hashtable to count individual items


# define a set of items that we want to count
items = ["apple", "pear", "orange", "banana", "apple",
         "orange", "apple", "pear", "banana", "orange",
         "apple", "kiwi", "pear", "apple", "orange"]

counter = dict()

for item in items:
    if counter.get(item) != None:
        counter[item] = counter[item] + 1
    else:
        counter[item] = 1

# print the results
print(counter)
