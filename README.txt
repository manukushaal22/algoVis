CSE-526 Project - Algorithm Visualizer (AlgoVis)

Identification

    Team:
        Kushaal Hulsoor (114776851)
        Priyanka Bhosale (114779627)

Approach and Explanation

    Project overview, design and implementation details are discussed in detail in the project report file in the
    project root directory with filename "CSE526_Project_Report.pdf". Please refer to that document.

A. Directory structure and Files

    There are multiple files within this project root that are auto-generated when we install React and are required by
    that framework. We are going to focus only on files that we have changed or created.
    Entire Project is divided into two directories:
        1. src
        2. tests
    1. src
        This contains "App.js" file which is the entry point of our project, contains template that renders the
        navigation bar and its controls and triggers the other components of the page.
        All the other components are categorized and implemented in separate directories under "component"
        a. editor
            Contains "editor.js" that initializes and renders the code editor in the UI. We are using "ace" module
            which is open-source and provides excellent design and UI to edit code.
        b. visualizer
            - Visualizer.js
                This file contains template code for the visualizer component. It also contains a function
                "processProgram()" which is the core part of our project. It takes the code user provided as input,
                initializes few global constants that are required by the program to run, and the passes it to the
                eval() function which executes the program in that custom context. This also makes a few changes to the
                state variables of the component to block user controls when the animations are running, and display
                errors wherever required.
                This also has a method called "consumeQueueAction()". This is triggered whenever the Next button is
                clicked in Debug mode. All the animations that are to be displayed are stored into a global queue
                instead of immediately reflecting on the page. Everytime the user clicks the next button, one atomic
                action is dequeued and executed.
            - common.js
                These contain classes that are required to be accessed globally, both in the application context and
                the user program context. The Styles, DebugQueue and Timer classes are declared here.
            - Graph.js
                This contains the GraphNode class and its functions that manage the graph and trigger the visualization.
            - Array.js
                This contains the Array class and its functions that control the array and its functions.
        c. Home.js
            This file contains template and logic regarding the switching between Styles and Code editor.

    2. tests
        This contains multiple files each testing a specific algorithm and testing its visualization. To run the tests,
        we must first run the application and execute each test within the editor of webpage.

B. Setup project and run.

    The application uses node, hence it is required to have node package manager installed in our system.
    Then,
    The application can be setup by running the below command in project root:
        npm install
    The application can be started by running below command:
        npm start
    The application can be run in any browser (tested on Chrome) using address localhost:3000


c. Credits
    - DistAlgo(http://distalgo.cs.stonybrook.edu) by
        Annie Liu, liu@cs.stonybrook.edu, and Scott Stoller, stoller@cs.stonybrook.edu

    -https://www.cs.usfca.edu/~galles/visualization/Algorithms.html
    -https://www.cs.usfca.edu/~galles/visualization/source.html
        Copyright 2011 David Galles, University of San Francisco,  accessed on Feb 18th, 2022

    -https://pythontutor.com/visualize.html#mode=display
                          Philip Guo on January 2010, accessed on Feb 18th, 2022

    -https://reactjs.org/docs/getting-started.html
            Copyright © 2022 Meta Platforms, Inc, accessed on Mar 1st, 2022


    -https://algorithm-visualizer.org/
        https://github.com/algorithm-visualizer
        https://github.com/algorithm-visualizer/algorithm-visualizer/blob/master/LICENSE
        Copyright (c) 2019 Jinseo Jason Park, accessed on Feb 18th, 2022

    -https://visualgo.net/en
        Project Leader & Advisor (Jul 2011-present):
        Dr. Steven Halim, Senior Lecturer, School of Computing (SoC), National   University of Singapore (NUS)
        Dr. Felix Halim, Senior Software Engineer, Google (Mountain View).
        accessed on Feb 18th, 2022

    -https://cyberzhg.github.io/toolbox/nfa2dfa
    https://github.com/CyberZHG/toolbox
         Copyright (C) 2007 Free Software Foundation, Inc.,
                accessed on Mar 1st, 2022

    -https://github.com/unicomputing/s22-algovis
        Source Code.

    https://www.geeksforgeeks.org/
        Algorithms for testing

    https://docs.google.com/document/d/1qfv-EPGBOCkneQRbURvS_p_iKA8lfKGQ5YEMYM4YP_Q/edit
        Documentation
