const Tree = {
  Basics: {
    0: 'Data Types',
    1: 'Control Flows',
    2: 'Strings',
    3: 'Bit Operators'
  },

  'Control Flows': {
    0: 'if statement',
    1: 'if else',
    2: 'if else ladder',
    3: 'switch statement',
    4: 'while loop',
    5: 'for loop',
    6: 'do while loop'
  },
  Strings: {
    0: 'Create String',
    1: 'Traverse String',
    2: 'Find in String',
    4: 'Get Length',
    5: 'Concatenate String',
    6: 'Reverse String',
    7: 'Sub String',
    8: 'Sclice String'
  },

  'Bit Operators': {
    0: 'Number to Binary',
    1: 'Binary to Number',
    2: 'Binary AND',
    3: 'Binary OR',
    4: 'Binary NOT',
    5: 'Binary XOR',
    6: 'Binary Left Shift',
    7: 'Binary Right Shift'
  },

  'Data Structure': {
    Arrays: {
      'One Dimensional Array': {
        0: 'Create Array',
        1: 'Linear Search',
        2: 'Binary Search',
        3: 'Merge Array',
        4: 'Concatenate Array',
        5: 'Reverse Array'
      },
      'Two Dimensional Array': {
        0: 'Create 2D Array',
        1: 'Traverse 2D Array',
        2: 'Matrix Addition',
        3: 'Matrix Subtraction',
        4: 'Matrix Multiplication'
      }
    },

    'Linked List': {
      'Singly Linked List': {
        0: 'Create SLL',
        1: 'Traverse in SLL',
        2: 'Insert at Head',
        3: 'Insert in Between',
        4: 'Insert at Tail',
        5: 'Delete at Head',
        6: 'Delete in Between',
        7: 'Delete at Tail',
        8: 'Reverse SLL'
      },
      'Doubly Linked List': {
        0: 'Create DLL',
        1: 'Traverse in DLL',
        2: 'Insert at Head',
        3: 'Insert in Between',
        4: 'Insert at Tail',
        5: 'Delete at Head',
        6: 'Delete in Between',
        7: 'Delete at Tail'
      }
    },
    Stack: {
      0: 'Stack Push',
      1: 'Stack Pop',
      2: 'Custom Stack'
    },

    Queue: {
      0: 'Enqueue',
      1: 'Dequeue',
      2: 'Custom Queue'
    },
    'Hash Table': {
      0: 'Closed Addressing',
      1: 'Open Addressing'
    }
  },

  Alorithms: {
    'Search Algorithms': {
      0: 'Search Alorithms',
      1: 'Sorting Alorithms'
    },
    'Sorting Algorithms': {
      0: 'Bubble Sort',
      1: 'Insertion Sort',
      2: 'Selection Sort',
      3: 'Quick Sort',
      4: 'Shell Sort',
      5: 'Count Sort',
      6: 'Radix Sort'
    }
  }
};

function RPT({ data }) {
  Object.entries(data).map(([key0, value0]) => {
    console.log(key0);

    if (typeof value0 == 'object') {
      Object.entries(value0).map(([key1, value1]) => {
        const tempkey = parseInt(key1);

        const flg1 = tempkey.toString() == 'NaN' ? false : true;

        if (typeof tempkey == 'number' && flg1) {
          console.log('\t', value1);
          return;
        }

        if (typeof key1 == 'string') {
          console.log('\t', key1);
          Object.entries(value1).map(([key2, value2]) => {
            const tempkey2 = parseInt(key2);
            const flg2 = tempkey2.toString() == 'NaN' ? false : true;
            if (typeof tempkey2 == 'number' && flg2) {
              console.log('\t\t', value2);
              return;
            }

            if (typeof key2 == 'string') {
              console.log('\t\t', key2);

              Object.entries(value2).map(([key3, value3]) => {
                const tempkey3 = parseInt(key3);
                const flg3 = tempkey3.toString() == 'NaN' ? false : true;

                if (typeof tempkey3 == 'number' && flg3) {
                  console.log('\t\t\t', value3);
                  return;
                }
                if (typeof key3 == 'string') {
                  console.log('\t\t\t', key3);
                }
              });
            }
          });
        }
      });
    }
  });
}

//RPT({ data: Tree });

/*
 *
 *
 function ProgrammingTree({ data }) {

	 return <>

		 { //react start1 

   Object.entries(data).map(([key0, value0]) =>(

     ( typeof value0 == 'object' ) && (
		
          <div className="accordion">
            <div className="accordion-title">
              <NavLink  >{key0}</NavLink>                                   
            </div>
            <div className="accordion-body">

       Object.entries(value0).map(([key1, value1]) => (
         const tempkey = parseInt(key1);

         const flg1 = tempkey.toString() == 'NaN' ? false : true;

         (typeof tempkey == 'number' && flg1) && (
           console.log('\t', value1);
           return <>
                   <div className="accordion-item">
                     <NavLink>{value1}</NavLink>
                   </div>;
					 </>

				 )

         (typeof key1 == 'string') && (

           <div className="accordion">
             <div className="accordion-title">
               <NavLink  >{key1}</NavLink>
             </div>
             <div className="accordion-body">

					  {
           Object.entries(value1).map(([key2, value2]) => (



             const tempkey2 = parseInt(key2);
             const flg2 = tempkey2.toString() == 'NaN' ? false : true;
             (typeof tempkey2 == 'number' && flg2) && (
              
            return <>                                                           
                    <div className="accordion-item">
                      <NavLink>{value2}</NavLink>
                    </div>;
            </>
						 )

             (typeof key2 == 'string') && (
               console.log('\t\t', key2);


            <div className="accordion">
              <div className="accordion-title">
                <NavLink  >{key2}</NavLink>
              </div>
              <div className="accordion-body">


           {
               Object.entries(value2).map(([key3, value3]) => (
                 const tempkey3 = parseInt(key3);
                 const flg3 = tempkey3.toString() == 'NaN' ? false : true;

                 (typeof tempkey3 == 'number' && flg3) && (
                   console.log('\t\t\t', value3);
                   return;
            return <>                                                                                                                                        <div className="accordion-item">
                      <NavLink>{value2}</NavLink>
                    </div>;
            </>
								 )
                 (typeof key3 == 'string') && (
                   return null 
								 )
							 ))
		 }
						 
		          </div>
           </div>
						 )
					 ))

		 }
				 
          </div>
        </div>


				 )
			 ))
     

         </div>
       </div>



	  )
	 ))

		} //react end1
	 </>

 }

 ProgrammingTree({ data: Tree });

*/

function ProgrammingTree({ data }) {
  return (
    <>
      {
        // React start
        Object.entries(data).map(
          ([key0, value0]) =>
            typeof value0 === 'object' && (
              <div className="accordion" key={key0}>
                <div className="accordion-title">
                  <NavLink>{key0}</NavLink>
                </div>
                <div className="accordion-body">
                  {Object.entries(value0).map(([key1, value1]) => {
                    const tempkey = parseInt(key1);
                    const flg1 = isNaN(tempkey) ? false : true;

                    return (
                      <React.Fragment key={key1}>
                        {typeof tempkey === 'number' && flg1 && (
                          <div className="accordion-item">
                            <NavLink>{value1}</NavLink>
                          </div>
                        )}
                        {typeof key1 === 'string' && (
                          <div className="accordion">
                            <div className="accordion-title">
                              <NavLink>{key1}</NavLink>
                            </div>
                            <div className="accordion-body">
                              {Object.entries(value1).map(([key2, value2]) => {
                                const tempkey2 = parseInt(key2);
                                const flg2 = isNaN(tempkey2) ? false : true;

                                return (
                                  <React.Fragment key={key2}>
                                    {typeof tempkey2 === 'number' && flg2 && (
                                      <div className="accordion-item">
                                        <NavLink>{value2}</NavLink>
                                      </div>
                                    )}
                                    {typeof key2 === 'string' && (
                                      <div className="accordion">
                                        <div className="accordion-title">
                                          <NavLink>{key2}</NavLink>
                                        </div>
                                        <div className="accordion-body">
                                          {Object.entries(value2).map(
                                            ([key3, value3]) => {
                                              const tempkey3 = parseInt(key3);
                                              const flg3 = isNaN(tempkey3)
                                                ? false
                                                : true;

                                              return (
                                                <React.Fragment key={key3}>
                                                  {typeof tempkey3 ===
                                                    'number' &&
                                                    flg3 && (
                                                      <div className="accordion-item">
                                                        <NavLink>
                                                          {value3}
                                                        </NavLink>
                                                      </div>
                                                    )}
                                                  {typeof key3 === 'string' &&
                                                    null}
                                                </React.Fragment>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )
        )
      }{' '}
      // React end
    </>
  );
}
