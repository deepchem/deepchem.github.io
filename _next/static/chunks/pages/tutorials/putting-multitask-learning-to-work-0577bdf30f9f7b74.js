(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7914],{9311:function(n,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tutorials/putting-multitask-learning-to-work",function(){return a(1878)}])},1878:function(n,s,a){"use strict";a.r(s),a.d(s,{default:function(){return c}});var p=a(5893),e=a(1618),t=a(6485),l={html:'<main>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h1>\n      Putting Multitask Learning to Work\n      <a class="anchor-link" href="#Putting-Multitask-Learning-to-Work">\n       \xb6\n      </a>\n     </h1>\n     <p>\n      This notebook walks through the creation of multitask models on MUV [1]. The goal is to demonstrate how multitask methods can provide improved performance in situations with little or very unbalanced data.\n     </p>\n     <h2>\n      Colab\n      <a class="anchor-link" href="#Colab">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      This tutorial and the rest in this sequence are designed to be done in Google colab. If you\'d like to open this notebook in colab, you can use the following link.\n     </p>\n     <p>\n      <a href="https://colab.research.google.com/github/deepchem/deepchem/blob/master/examples/tutorials/Putting_Multitask_Learning_to_Work.ipynb">\n       <img alt="Open In Colab" src="https://colab.research.google.com/assets/colab-badge.svg"/>\n      </a>\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[\xa0]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="cm-editor cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll font-mono"><span></span><span class="o">!</span>pip install --pre deepchem\n<span class="kn">import</span> <span class="nn">deepchem</span>\n<span class="n">deepchem</span><span class="o">.</span><span class="n">__version__</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      The MUV dataset is a challenging benchmark in molecular design that consists of 17 different "targets" where there are only a few "active" compounds per target. There are 93,087 compounds in total, yet no task has more than 30 active compounds, and many have even less. Training a model with such a small number of positive examples is very challenging.  Multitask models address this by training a single model that predicts all the different targets at once. If a feature is useful for predicting one task, it often is useful for predicting several other tasks as well. Each added task makes it easier to learn important features, which improves performance on other tasks [2].\n     </p>\n     <p>\n      To get started, let\'s load the MUV dataset.  The MoleculeNet loader function automatically splits it into training, validation, and test sets.  Because there are so few positive examples, we use stratified splitting to ensure the test set has enough of them to evaluate.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[1]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="cm-editor cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll font-mono"><span></span><span class="kn">import</span> <span class="nn">deepchem</span> <span class="k">as</span> <span class="nn">dc</span>\n<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>\n\n<span class="n">tasks</span><span class="p">,</span> <span class="n">datasets</span><span class="p">,</span> <span class="n">transformers</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">molnet</span><span class="o">.</span><span class="n">load_muv</span><span class="p">(</span><span class="n">split</span><span class="o">=</span><span class="s1">\'stratified\'</span><span class="p">)</span>\n<span class="n">train_dataset</span><span class="p">,</span> <span class="n">valid_dataset</span><span class="p">,</span> <span class="n">test_dataset</span> <span class="o">=</span> <span class="n">datasets</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      Now let\'s train a model on it.  We\'ll use a MultitaskClassifier, which is a simple stack of fully connected layers.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[2]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="cm-editor cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll font-mono"><span></span><span class="n">n_tasks</span> <span class="o">=</span> <span class="nb">len</span><span class="p">(</span><span class="n">tasks</span><span class="p">)</span>\n<span class="n">n_features</span> <span class="o">=</span> <span class="n">train_dataset</span><span class="o">.</span><span class="n">get_data_shape</span><span class="p">()[</span><span class="mi">0</span><span class="p">]</span>\n<span class="n">model</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">MultitaskClassifier</span><span class="p">(</span><span class="n">n_tasks</span><span class="p">,</span> <span class="n">n_features</span><span class="p">)</span>\n<span class="n">model</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">train_dataset</span><span class="p">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n  <div class="jp-Cell-outputWrapper">\n   <div class="jp-Collapser jp-OutputCollapser jp-Cell-outputCollapser">\n   </div>\n   <div class="jp-OutputArea jp-Cell-outputArea">\n    <div class="jp-OutputArea-child jp-OutputArea-executeResult">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n      Out[2]:\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output jp-OutputArea-executeResult" data-mime-type="text/plain" tabindex="0">\n      <pre class="overflow-x-scroll font-mono">0.0004961589723825455</pre>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      Let\'s see how well it does on the test set.  We loop over the 17 tasks and compute the ROC AUC for each one.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[3]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="cm-editor cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll font-mono"><span></span><span class="n">y_true</span> <span class="o">=</span> <span class="n">test_dataset</span><span class="o">.</span><span class="n">y</span>\n<span class="n">y_pred</span> <span class="o">=</span> <span class="n">model</span><span class="o">.</span><span class="n">predict</span><span class="p">(</span><span class="n">test_dataset</span><span class="p">)</span>\n<span class="n">metric</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">metrics</span><span class="o">.</span><span class="n">roc_auc_score</span>\n<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">n_tasks</span><span class="p">):</span>\n    <span class="n">score</span> <span class="o">=</span> <span class="n">metric</span><span class="p">(</span><span class="n">dc</span><span class="o">.</span><span class="n">metrics</span><span class="o">.</span><span class="n">to_one_hot</span><span class="p">(</span><span class="n">y_true</span><span class="p">[:,</span><span class="n">i</span><span class="p">]),</span> <span class="n">y_pred</span><span class="p">[:,</span><span class="n">i</span><span class="p">])</span>\n    <span class="nb">print</span><span class="p">(</span><span class="n">tasks</span><span class="p">[</span><span class="n">i</span><span class="p">],</span> <span class="n">score</span><span class="p">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n  <div class="jp-Cell-outputWrapper">\n   <div class="jp-Collapser jp-OutputCollapser jp-Cell-outputCollapser">\n   </div>\n   <div class="jp-OutputArea jp-Cell-outputArea">\n    <div class="jp-OutputArea-child">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output" data-mime-type="text/plain" tabindex="0">\n      <pre class="overflow-x-scroll font-mono">MUV-466 0.9207684040838259\nMUV-548 0.7480655561526062\nMUV-600 0.9927995701235895\nMUV-644 0.9974207415368082\nMUV-652 0.7823481998925309\nMUV-689 0.6636843990686011\nMUV-692 0.6319093677234462\nMUV-712 0.7787838079885365\nMUV-713 0.7910711087229088\nMUV-733 0.4401307540748701\nMUV-737 0.34679383843811573\nMUV-810 0.9564571019165323\nMUV-832 0.9991044241447251\nMUV-846 0.7519881783987103\nMUV-852 0.8516747268493642\nMUV-858 0.5906591438294824\nMUV-859 0.5962954008166774\n</pre>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      Not bad!  Recall that random guessing would produce a ROC AUC score of 0.5, and a perfect predictor would score 1.0.  Most of the tasks did much better than random guessing, and many of them are above 0.9.\n     </p>\n     <h1>\n      Congratulations! Time to join the Community!\n      <a class="anchor-link" href="#Congratulations!-Time-to-join-the-Community!">\n       \xb6\n      </a>\n     </h1>\n     <p>\n      Congratulations on completing this tutorial notebook! If you enjoyed working through the tutorial, and want to continue working with DeepChem, we encourage you to finish the rest of the tutorials in this series. You can also help the DeepChem community in the following ways:\n     </p>\n     <h2>\n      Star DeepChem on\n      <a href="https://github.com/deepchem/deepchem">\n       GitHub\n      </a>\n      <a class="anchor-link" href="#Star-DeepChem-on-GitHub">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      This helps build awareness of the DeepChem project and the tools for open source drug discovery that we\'re trying to build.\n     </p>\n     <h2>\n      Join the DeepChem Gitter\n      <a class="anchor-link" href="#Join-the-DeepChem-Gitter">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      The DeepChem\n      <a href="https://gitter.im/deepchem/Lobby">\n       Gitter\n      </a>\n      hosts a number of scientists, developers, and enthusiasts interested in deep learning for the life sciences. Join the conversation!\n     </p>\n     <h1>\n      Bibliography\n      <a class="anchor-link" href="#Bibliography">\n       \xb6\n      </a>\n     </h1>\n     <p>\n      [1]\n      <a href="https://pubs.acs.org/doi/10.1021/ci8002649">\n       https://pubs.acs.org/doi/10.1021/ci8002649\n      </a>\n     </p>\n     <p>\n      [2]\n      <a href="https://pubs.acs.org/doi/abs/10.1021/acs.jcim.7b00146">\n       https://pubs.acs.org/doi/abs/10.1021/acs.jcim.7b00146\n      </a>\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper" tabindex="0">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[\xa0]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="cm-editor cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll font-mono"><span></span> \n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n</main>\n'},o=a(7294),i=a(7466),r=a.n(i);let d=()=>((0,o.useEffect)(()=>{var n,s;null===(n=document.getElementsByClassName("scroll-nav")[0])||void 0===n||n.remove();let a=document.querySelector(".notebook"),p=document.querySelector(".notebook");p&&a&&r().init(a,{sections:"h1, h2",insertTarget:p,insertLocation:"after"}),null==MathJax||null===(s=MathJax.Hub)||void 0===s||s.Queue(["Typeset",MathJax.Hub])},[]),(0,p.jsx)("div",{className:"overflow-x-scroll",dangerouslySetInnerHTML:{__html:"".concat(l.html," ").concat(t.Z)}}));d.Layout=e.Z;var c=d}},function(n){n.O(0,[2443,9774,2888,179],function(){return n(n.s=9311)}),_N_E=n.O()}]);