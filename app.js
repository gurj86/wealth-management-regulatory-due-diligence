const $=id=>document.getElementById(id);
const findings=[
["high","Ongoing-service delivery evidence","8 of 20 sampled ongoing-advice files do not contain clear evidence that the contracted annual review was completed or appropriately offered."],
["high","Replacement / switching rationale","Several replacement cases show limited evidence that disadvantages, costs and existing-plan benefits were sufficiently compared."],
["medium","Suitability-document quality","Fact-find, objective and risk-profile evidence is inconsistent across advisers, increasing uncertainty over whether recommendations are fully supportable."],
["medium","Vulnerability recording","Support needs appear in notes but are not consistently carried through into suitability reports or service decisions."]
];
const themes=[["Ongoing service evidence",8],["Suitability documentation",7],["Replacement / switching",6],["Consumer Duty / support",5],["Pension advice evidence",4]];
const files=[
{id:"WM-001",client:"A. Hughes",area:"Pension drawdown",value:"£640,000",vuln:"Recent bereavement",status:"Material Concern",title:"Drawdown recommendation after bereavement",evidence:"Client recently lost spouse. File records need for income and desire for flexibility. Risk questionnaire is present, but cashflow evidence is limited and the suitability report does not clearly explain how bereavement, income sustainability and capacity for loss affected the recommendation.",assessment:"The recommendation may be supportable, but the file does not currently evidence the reasoning to acquisition due-diligence standard. This creates suitability and potential remediation uncertainty.",findings:[["high","Capacity-for-loss evidence gap","The file does not clearly demonstrate how sustainable income and downside risk were assessed."],["high","Vulnerability consideration not explicit","Bereavement is recorded but not clearly reflected in the suitability rationale or support approach."]]},{id:"WM-002",client:"J. Patel",area:"ISA / GIA replacement",value:"£210,000",vuln:"None recorded",status:"Further Investigation",title:"Platform and investment replacement",evidence:"Existing platform was replaced with the firm's preferred platform. Charges are listed, but the file contains limited comparison of existing product benefits, exit costs and disadvantages of switching.",assessment:"Further investigation is required to establish whether the replacement was demonstrably in the client's interests and whether the recommendation was sufficiently evidenced.",findings:[["high","Replacement comparison incomplete","Benefits and disadvantages of the existing arrangement are not clearly compared with the new recommendation."],["low","Conflict / preferred-platform consideration","The buyer should understand governance over preferred-platform recommendations and adviser incentives."]]},{id:"WM-003",client:"S. Morgan",area:"Annual review",value:"£385,000",vuln:"None recorded",status:"Material Concern",title:"Paid ongoing service with weak delivery evidence",evidence:"Client has paid an ongoing advice charge for three years. The CRM shows one completed annual review and two automated invitations, with no documented follow-up or evidence of service delivery for the other years.",assessment:"This should be treated as a potentially material acquisition issue. The buyer should quantify the wider client population and test contractual service commitments, contact attempts, opt-outs and fee records.",findings:[["high","Potential ongoing-service gap","Evidence does not clearly show delivery of the paid-for service across the period sampled."],["high","Population risk","A thematic weakness may create remediation and reputational exposure if repeated across the acquired client base."]]},{id:"WM-004",client:"R. Davies",area:"Investment advice",value:"£145,000",vuln:"None recorded",status:"Pass",title:"Investment recommendation with complete rationale",evidence:"Fact-find, objectives, time horizon, knowledge and experience, financial position, attitude to risk and capacity for loss are documented. Recommendation rationale explains product choice, costs, risks and alternatives.",assessment:"No material due-diligence exception identified in this fictional file. The buyer should still consider adviser-level and population-level trends rather than relying on a single passing file.",findings:[["low","No material file exception","Evidence appears coherent and supports the recommendation in this fictional example."]]}
];
const risks=[
["Ongoing advice service delivery","Sample contains files with unclear evidence of paid-for annual reviews","Potential remediation, Consumer Duty and reputational exposure","High","Expand sampling; quantify population; test fees vs service delivery","Pre-completion"],
["Replacement / switching suitability","Weak existing-vs-new comparison on sampled replacement files","Unsuitable advice / remediation uncertainty","High","Targeted replacement-file review and adviser segmentation","Pre-completion"],
["Suitability record quality","Inconsistent fact-find and rationale standards","Defensibility and complaint-handling risk","Medium","Map adviser/file-quality trends; strengthen integration controls","Pre & post"],
["Vulnerability governance","Support needs inconsistently reflected in advice records","Consumer Duty / customer-support risk","Medium","Review vulnerable-customer framework and case sampling","Pre-completion"],
["Integration control environment","Acquisition target uses multiple legacy CRM processes","Operational and conduct risk during migration","Medium","Create 100-day control plan and MI pack","Post-completion"]
];

document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.view').forEach(x=>x.classList.remove('active-view'));t.classList.add('active');$(t.dataset.view).classList.add('active-view')});
$('keyFindings').innerHTML=findings.map(f=>`<div class="finding-row ${f[0]}"><strong>${f[1]}</strong><div>${f[2]}</div></div>`).join('');
$('themeBars').innerHTML=themes.map(t=>`<div class="theme-row"><strong>${t[0]}</strong><div class="bar"><i style="width:${t[1]*11}%"></i></div><span>${t[1]}</span></div>`).join('');
let current=files[0];
function cls(s){return s.replaceAll(' ','-')}
function renderList(){const f=$('fileFilter').value;$('fileList').innerHTML='';files.filter(x=>f==='all'||x.status===f).forEach(x=>{const b=document.createElement('button');b.className='file-btn'+(x.id===current.id?' active':'');b.innerHTML=`<strong>${x.id} · ${x.title}</strong><span>${x.client} · ${x.status}</span>`;b.onclick=()=>{current=x;renderFile()};$('fileList').appendChild(b)})}
function renderFile(){$('fileTitle').textContent=current.id+' · '+current.title;$('fileStatus').textContent=current.status;$('fileStatus').className='status '+cls(current.status);$('client').textContent=current.client;$('adviceArea').textContent=current.area;$('value').textContent=current.value;$('vulnerability').textContent=current.vuln;$('evidence').textContent=current.evidence;$('assessment').textContent=current.assessment;$('fileFindings').innerHTML=current.findings.map(f=>`<div class="finding ${f[0]}"><strong>${f[1]}</strong><p>${f[2]}</p></div>`).join('');renderList()}
$('fileFilter').onchange=renderList;renderFile();
$('riskRows').innerHTML=risks.map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td class="risk-${r[3].toLowerCase()}">${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('');
const actions=[['Expand thematic sampling','Increase review of ongoing-service and replacement-advice populations before completion.'],['Quantify affected populations','Reconcile CRM, fee and service-delivery data to establish potential exposure.'],['Seek contractual protection','Consider warranties, indemnities, retention or price adjustment where uncertainty cannot be resolved pre-completion.'],['Build a 100-day remediation plan','Define owners, governance, customer-priority rules, QA and reporting before integration.']];$('actions').innerHTML=actions.map(a=>`<div class="action"><strong>${a[0]}</strong><span>${a[1]}</span></div>`).join('');
function calc(){const a=+$('affected').value,r=+$('avgRedress').value,u=+$('uplift').value;$('affectedVal').textContent=a.toLocaleString()+' clients';$('avgRedressVal').textContent='£'+r.toLocaleString();$('upliftVal').textContent=u+'%';$('exposureTotal').textContent='£'+Math.round(a*r*(1+u/100)).toLocaleString()}
['affected','avgRedress','uplift'].forEach(id=>$(id).oninput=calc);calc();

function hasAny(text, terms){return terms.some(t=>text.includes(t))}
function addAiFinding(arr,severity,title,detail){arr.push([severity,title,detail])}

$('loadAiExample').onclick=()=>{
 $('aiAdviceType').value='Platform / product replacement';
 $('aiClientValue').value='£420,000';
 $('aiFileNotes').value="Client is 67 and recently bereaved. Existing platform holds ISA, GIA and pension assets. Adviser recommends moving all assets to the firm's preferred platform. File includes the new platform charges but does not clearly compare exit costs, existing guarantees, tax consequences or disadvantages of switching. Risk profile is recorded as balanced. Capacity for loss is not clearly documented. Client says they find financial paperwork difficult and would prefer their daughter to join future meetings.";
 $('aiAdviserRationale').value="The new platform is easier to manage and is used by the firm for most clients. The client agreed to the recommendation and the overall charge is competitive, so the switch is suitable.";
};

$('runAiReview').onclick=()=>{
 const type=$('aiAdviceType').value;
 const value=$('aiClientValue').value.trim();
 const notes=$('aiFileNotes').value.trim();
 const rationale=$('aiAdviserRationale').value.trim();

 if(!notes && !rationale){
   $('aiEmptyState').innerHTML='<strong>Add fictional file information first</strong><span>The prototype needs file notes or an adviser rationale to review.</span>';
   return;
 }

 const evidence=(notes+' '+rationale).toLowerCase();
 const rat=rationale.toLowerCase();
 const flags=[];
 const questions=[];

 if(type.includes('replacement') || hasAny(evidence,['switch','replace','preferred platform','new platform'])){
   if(!hasAny(evidence,['existing benefits','disadvantages','exit cost','exit costs','guarantee','tax consequence','comparison','alternatives'])){
     addAiFinding(flags,'high','Replacement / switching comparison may be incomplete','The file does not clearly evidence a balanced comparison of the existing arrangement against the proposed replacement, including disadvantages, costs and lost benefits.');
     questions.push('How many replacement or switching cases exist across the target firm, and are similar evidence gaps concentrated by adviser or product?');
   }
 }

 if(type.includes('Pension') || hasAny(evidence,['pension','drawdown','retirement','income'])){
   if(!hasAny(evidence,['cashflow','capacity for loss','sustainable income','longevity','withdrawal rate'])){
     addAiFinding(flags,'high','Retirement suitability evidence may be incomplete','The file does not clearly demonstrate how sustainable income, downside risk and capacity for loss were assessed.');
     questions.push('Does the target firm apply a consistent retirement-income and capacity-for-loss methodology across pension advice files?');
   }
 }

 if(hasAny(evidence,['bereavement','mental health','illness','dementia','hearing','language','vulnerab','difficulty with paperwork','daughter to join','son to join'])){
   if(!hasAny(rat,['vulnerab','support','adjustment','communication','bereav','family member','additional help'])){
     addAiFinding(flags,'high','Support need is not reflected in the adviser rationale','The notes include a potential vulnerability or support need, but the final rationale does not show how it influenced the advice process or ongoing support.');
     questions.push('How consistently are vulnerability and support needs transferred from fact-find notes into suitability reports and ongoing-service records?');
   }
 }

 if(!hasAny(evidence,['capacity for loss','financial position','income','expenditure','assets','liabilities'])){
   addAiFinding(flags,'medium','Financial resilience evidence appears limited','The entered information does not clearly show how the client’s financial position or ability to absorb loss was assessed.');
 }

 if(!hasAny(evidence,['objective','objectives','goal','goals','need for','client wants','client requires'])){
   addAiFinding(flags,'medium','Client objectives are not clearly evidenced','The file text does not clearly link the recommendation to specific client objectives or needs.');
 }

 if(!hasAny(evidence,['cost','charge','charges','fee','fees'])){
   addAiFinding(flags,'medium','Cost and value evidence is limited','The file does not clearly show how charges or value were considered as part of the recommendation.');
 }

 if(hasAny(rat,['client agreed','customer agreed','used by the firm','most clients','standard process','preferred platform']) && !hasAny(rat,['because the client','client circumstances','specific objective','capacity for loss','existing benefits','disadvantages'])){
   addAiFinding(flags,'medium','Rationale appears process-led rather than client-specific','The conclusion relies on client agreement or firm-standard practice rather than clearly evidencing why the recommendation is suitable for this individual client.');
 }

 if(rationale.length<100){
   addAiFinding(flags,'medium','Adviser rationale may be too brief','The final rationale may not provide enough evidence of the judgement, alternatives considered and client-specific reasoning to support due-diligence assurance.');
 }

 if(flags.length===0){
   addAiFinding(flags,'pass','No obvious rule-based exception identified','The prototype did not identify an obvious evidence gap in the text entered. A qualified reviewer should still validate the full source file and suitability evidence.');
 }

 if(questions.length===0){
   questions.push('Does the target firm show any adviser-level, product-level or branch-level concentration of similar findings?');
   questions.push('What QA, monitoring and remedial controls exist for this advice type?');
 }

 const high=flags.filter(f=>f[0]==='high').length;
 const material=flags.filter(f=>f[0]!=='pass').length;
 const outcome=high>=2?'Material Concern':material>0?'Further Investigation':'Pass';

 $('aiEmptyState').classList.add('hidden');
 $('aiResults').classList.remove('hidden');
 $('aiRiskOutcome').textContent=outcome;
 $('aiFlagCount').textContent=material+' flag'+(material===1?'':'s');

 $('aiReviewSummary').textContent=
   outcome==='Pass'
   ? 'No obvious exception was detected by the prototype rules. A human reviewer should still validate the complete advice file and regulatory context.'
   : outcome==='Material Concern'
   ? 'The file contains multiple potentially material evidence gaps. The recommendation may still be suitable, but the current documentation would not be sufficient to rely on without further investigation.'
   : 'The file contains one or more evidence gaps that should be resolved before the buyer relies on the advice outcome or population-level liability assumptions.';

 const summaryBits=[];
 if(high>0) summaryBits.push(high+' potentially material issue'+(high===1?'':'s'));
 if(type) summaryBits.push(type.toLowerCase());
 if(value) summaryBits.push('client value '+value);
 $('aiBuyerSummary').textContent=
   'Sample file review identified '+(summaryBits.join(', ')||'potential due-diligence issues')+
   '. Buyer should test whether the finding is isolated or systemic, expand targeted sampling where appropriate, and quantify any affected population before completion.';

 $('aiChallengeFindings').innerHTML=flags.map(f=>'<div class="finding '+f[0]+'"><strong>'+f[1]+'</strong><p>'+f[2]+'</p></div>').join('');
 $('aiAcquisitionQuestions').innerHTML=questions.map(q=>'<div class="question">'+q+'</div>').join('');
 document.querySelectorAll('.ai-decisions button').forEach(b=>b.classList.remove('selected'));
};

document.querySelectorAll('.ai-decisions button').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.ai-decisions button').forEach(x=>x.classList.remove('selected'));
 b.classList.add('selected');
 $('aiDecisionNote').textContent='Human reviewer selected: '+b.dataset.aiDecision+'. In a live control framework the decision, evidence and reviewer rationale would be retained in the audit trail.';
});
