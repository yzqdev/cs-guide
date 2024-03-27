import{_ as n,o as s,c as a,a as e}from"./app-BO2oONDQ.js";const p={},t=e(`<h1 id="webpack搭建react开发" tabindex="-1"><a class="header-anchor" href="#webpack搭建react开发"><span>webpack搭建react开发</span></a></h1><h2 id="使用swc" tabindex="-1"><a class="header-anchor" href="#使用swc"><span>使用swc</span></a></h2><p>webpack.common.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">&#39;webpack&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// const Dotenv = require(&#39;dotenv-webpack&#39;);</span>
<span class="token keyword">import</span> MiniCssExtractPlugin <span class="token keyword">from</span> <span class="token string">&#39;mini-css-extract-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> HtmlwebpackPlugin <span class="token keyword">from</span> <span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;webpack-dev-server&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> conf<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token string">&#39;./src/index.tsx&#39;</span><span class="token punctuation">,</span>
  devtool<span class="token operator">:</span> <span class="token string">&#39;source-map&#39;</span><span class="token punctuation">,</span>
  mode<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.tsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  devServer<span class="token operator">:</span> <span class="token punctuation">{</span>
    port<span class="token operator">:</span> <span class="token number">3200</span><span class="token punctuation">,</span>
    host<span class="token operator">:</span> <span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span>
    hot<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    historyApiFallback<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
    publicPath<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
  
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span>tsx<span class="token quantifier number">?</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span>node_modules<span class="token alternation keyword">|</span>bower_components<span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">{</span>
          loader<span class="token operator">:</span> <span class="token string">&#39;swc-loader&#39;</span><span class="token punctuation">,</span>
          options<span class="token operator">:</span> <span class="token punctuation">{</span>
            jsc<span class="token operator">:</span> <span class="token punctuation">{</span>
              parser<span class="token operator">:</span> <span class="token punctuation">{</span>
                syntax<span class="token operator">:</span> <span class="token string">&#39;typescript&#39;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>jpg<span class="token alternation keyword">|</span>png<span class="token alternation keyword">|</span>svg<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              limit<span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
              publicPath<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>less<span class="token alternation keyword">|</span>css<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              sourceMap<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              lessOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
                javascriptEnabled<span class="token operator">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// new Dotenv({</span>
    <span class="token comment">//   path: process.env.NODE_ENV === &#39;production&#39; ? &#39;.env.production&#39; : &#39;.env&#39;,</span>
    <span class="token comment">//   defaults: &#39;.env&#39;,</span>
    <span class="token comment">// }),</span>
    <span class="token comment">// new CopyWebpackPlugin({patterns:[</span>
    <span class="token comment">//     {</span>
    <span class="token comment">//       from: &quot;public&quot;,</span>
    <span class="token comment">//</span>
    <span class="token comment">//     }</span>
    <span class="token comment">//   ]}),</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlwebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;Kanban Boards Template&#39;</span><span class="token punctuation">,</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
      template<span class="token operator">:</span> <span class="token string">&#39;./src/index.html&#39;</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      hash<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      path<span class="token operator">:</span> <span class="token string">&#39;./&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;[name].css&#39;</span><span class="token punctuation">,</span>
      chunkFilename<span class="token operator">:</span> <span class="token string">&#39;[id].css&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> conf<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用babel" tabindex="-1"><a class="header-anchor" href="#使用babel"><span>使用babel</span></a></h2><p>babel.config.json</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token property">&quot;modules&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;@babel/preset-react&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack.base.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">&#39;webpack&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// const Dotenv = require(&#39;dotenv-webpack&#39;);</span>
<span class="token keyword">import</span> MiniCssExtractPlugin <span class="token keyword">from</span> <span class="token string">&#39;mini-css-extract-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> HtmlwebpackPlugin <span class="token keyword">from</span> <span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;webpack-dev-server&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> conf<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token string">&#39;./src/index.tsx&#39;</span><span class="token punctuation">,</span>
  devtool<span class="token operator">:</span> <span class="token string">&#39;source-map&#39;</span><span class="token punctuation">,</span>
  mode<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.tsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  devServer<span class="token operator">:</span> <span class="token punctuation">{</span>
    port<span class="token operator">:</span> <span class="token number">3200</span><span class="token punctuation">,</span>
    host<span class="token operator">:</span> <span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span>
    hot<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    historyApiFallback<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">&#39;[name].[contenthash].js&#39;</span><span class="token punctuation">,</span>
    publicPath<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// {</span>
      <span class="token comment">//   test: /\\.tsx?$/,</span>
      <span class="token comment">//   use: [&#39;babel-loader&#39;],</span>
      <span class="token comment">//   exclude: /node_modules/</span>
      <span class="token comment">// },</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span>tsx<span class="token quantifier number">?</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>

        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;babel-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// options: {</span>
            <span class="token comment">//   presets: [&#39;@babel/preset-env&#39;, &#39;@babel/preset-react&#39;]</span>
            <span class="token comment">// }</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;ts-loader&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>jpg<span class="token alternation keyword">|</span>png<span class="token alternation keyword">|</span>svg<span class="token alternation keyword">|</span>gif<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>less<span class="token alternation keyword">|</span>css<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              sourceMap<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              lessOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
                javascriptEnabled<span class="token operator">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// new Dotenv({</span>
    <span class="token comment">//   path: process.env.NODE_ENV === &#39;production&#39; ? &#39;.env.production&#39; : &#39;.env&#39;,</span>
    <span class="token comment">//   defaults: &#39;.env&#39;,</span>
    <span class="token comment">// }),</span>
    <span class="token comment">// new CopyWebpackPlugin({patterns:[</span>
    <span class="token comment">//     {</span>
    <span class="token comment">//       from: &quot;public&quot;,</span>
    <span class="token comment">//</span>
    <span class="token comment">//     }</span>
    <span class="token comment">//   ]}),</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlwebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;Kanban Boards Template&#39;</span><span class="token punctuation">,</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
      template<span class="token operator">:</span> <span class="token string">&#39;./src/index.html&#39;</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      hash<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      path<span class="token operator">:</span> <span class="token string">&#39;./&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;[name].css&#39;</span><span class="token punctuation">,</span>
      chunkFilename<span class="token operator">:</span> <span class="token string">&#39;[id].css&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  optimization<span class="token operator">:</span><span class="token punctuation">{</span>
    splitChunks<span class="token operator">:</span><span class="token punctuation">{</span>
      chunks<span class="token operator">:</span><span class="token string">&#39;all&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> conf<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用esbuild" tabindex="-1"><a class="header-anchor" href="#使用esbuild"><span>使用esbuild</span></a></h2><p>webpack.base.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">&#39;webpack&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// const Dotenv = require(&#39;dotenv-webpack&#39;);</span>
<span class="token keyword">import</span> MiniCssExtractPlugin <span class="token keyword">from</span> <span class="token string">&#39;mini-css-extract-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> HtmlwebpackPlugin <span class="token keyword">from</span> <span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;webpack-dev-server&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> conf<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token string">&#39;./src/index.tsx&#39;</span><span class="token punctuation">,</span>
  devtool<span class="token operator">:</span> <span class="token string">&#39;source-map&#39;</span><span class="token punctuation">,</span>
  mode<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.tsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  devServer<span class="token operator">:</span> <span class="token punctuation">{</span>
    port<span class="token operator">:</span> <span class="token number">3200</span><span class="token punctuation">,</span>
    host<span class="token operator">:</span> <span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span>
    hot<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    historyApiFallback<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">&#39;[name].[contenthash].js&#39;</span><span class="token punctuation">,</span>
    publicPath<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span>jt<span class="token char-class-punctuation punctuation">]</span></span>sx<span class="token quantifier number">?</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>

        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;esbuild-loader&#39;</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              target<span class="token operator">:</span> <span class="token string">&#39;es2015&#39;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>jpg<span class="token alternation keyword">|</span>png<span class="token alternation keyword">|</span>svg<span class="token alternation keyword">|</span>gif<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token special-escape escape">\\.</span><span class="token group punctuation">(</span>less<span class="token alternation keyword">|</span>css<span class="token group punctuation">)</span><span class="token anchor function">$</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span>
            options<span class="token operator">:</span> <span class="token punctuation">{</span>
              sourceMap<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              lessOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
                javascriptEnabled<span class="token operator">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
  
    <span class="token keyword">new</span> <span class="token class-name">HtmlwebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&#39;Kanban Boards Template&#39;</span><span class="token punctuation">,</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
      template<span class="token operator">:</span> <span class="token string">&#39;./src/index.html&#39;</span><span class="token punctuation">,</span>
      inject<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      hash<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      path<span class="token operator">:</span> <span class="token string">&#39;./&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      filename<span class="token operator">:</span> <span class="token string">&#39;[name].css&#39;</span><span class="token punctuation">,</span>
      chunkFilename<span class="token operator">:</span> <span class="token string">&#39;[id].css&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> conf<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack.build.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">&#39;webpack&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> merge <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;webpack-merge&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> base <span class="token keyword">from</span> <span class="token string">&#39;./webpack.common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>EsbuildPlugin<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;esbuild-loader&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;webpack-dev-server&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> conf<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>base<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  mode<span class="token operator">:</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span>
  devtool<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  optimization<span class="token operator">:</span> <span class="token punctuation">{</span>
    splitChunks<span class="token operator">:</span><span class="token punctuation">{</span>
      chunks<span class="token operator">:</span> <span class="token string">&#39;all&#39;</span>
      <span class="token punctuation">,</span>maxSize<span class="token operator">:</span> <span class="token number">244</span><span class="token operator">*</span><span class="token number">1024</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
      minimizer<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">EsbuildPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          target<span class="token operator">:</span> <span class="token string">&#39;es2015&#39;</span><span class="token punctuation">,</span>
         css<span class="token operator">:</span> <span class="token boolean">true</span>  <span class="token comment">// Apply minification to CSS assets</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> conf<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[t];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","webpack-react.html.vue"]]),k=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-react.html","title":"webpack搭建react开发","lang":"zh-CN","frontmatter":{"description":"webpack搭建react开发 使用swc webpack.common.ts 使用babel babel.config.json webpack.base.ts 使用esbuild webpack.base.ts webpack.build.ts","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-react.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webpack搭建react开发"}],["meta",{"property":"og:description","content":"webpack搭建react开发 使用swc webpack.common.ts 使用babel babel.config.json webpack.base.ts 使用esbuild webpack.base.ts webpack.build.ts"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-04T19:25:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-04T19:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webpack搭建react开发\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-04T19:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用swc","slug":"使用swc","link":"#使用swc","children":[]},{"level":2,"title":"使用babel","slug":"使用babel","link":"#使用babel","children":[]},{"level":2,"title":"使用esbuild","slug":"使用esbuild","link":"#使用esbuild","children":[]}],"git":{"createdTime":1699125957000,"updatedTime":1699125957000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.22,"words":665},"filePathRelative":"frontend/framework/packaging-tool/webpack-react.md","localizedDate":"2023年11月4日","autoDesc":true}');export{r as comp,k as data};
