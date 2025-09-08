<script>
export default{
    name: 'Terms',
    data(){
        return{
            inNav:'Terms & Conditions',
        }
    },
    methods:{
        navigateTo(route) {
            this.inNav = route;
        }
    }
}
</script>
<template>
        <img src="/images/logonobg.png" alt="Elemath Logo" class="logo" @click="this.$router.push('/')">

    <header>
        <h1>Resources Content</h1>

        <nav>
            <ul>
                <li><button :style="{borderBottom: inNav === 'Terms & Conditions' ? '2px solid #000' : 'none'}" @click="navigateTo('Terms & Conditions')">Terms & Conditions</button></li>
                <li><button :style="{borderBottom: inNav === 'User Guide for ELEMATH' ? '2px solid #000' : 'none'}" @click="navigateTo('User Guide for ELEMATH')">User Guide for ELEMATH</button></li>
                <li><button :style="{borderBottom: inNav === 'FAQ (Frequently Asked Questions)' ? '2px solid #000' : 'none'}" @click="navigateTo('FAQ (Frequently Asked Questions)')">FAQ (Frequently Asked Questions)</button></li>
                <li><button :style="{borderBottom: inNav === 'Privacy Policy' ? '2px solid #000' : 'none'}" @click="navigateTo('Privacy Policy')">Privacy Policy</button></li>

            </ul>
        </nav>
    </header>
  <div class="terms-container" v-if="inNav === 'Terms & Conditions'">
    <h2>Terms & Conditions</h2>
    <h3>By using ELEMATH, you agree to the following terms:</h3>

    <h4>Educational Purpose Only</h4>
    <p>The system is created for learning mathematics and should not be used for cheating or non-educational activities.</p>

    <h4>Account Responsibility</h4>
    <p>Users must keep their login credentials safe. The ELEMATH team is not responsible for unauthorized access caused by user negligence.</p>

    <h4>Intellectual Property</h4>
    <p>All content, quizzes, and materials within ELEMATH are developed by the project team and protected under academic property rights.</p>

    <h4>Limitations of Liability</h4>
    <p>ELEMATH is provided as an academic project. We are not liable for any technical issues or data loss arising from system use.</p>

    <h4>Updates to Terms</h4>
    <p>The ELEMATH team may update these Terms & Conditions when necessary. Continued use of the system means you agree to the updated terms.</p>
  </div>
  <div  class="terms-container" v-else-if="inNav === 'User Guide for ELEMATH'">
    <h2>Welcome to ELEMATH! <br></h2>
    <h3>ELEMATH is a web-based learning tool designed to help elementary students strengthen their mathematics skills, aligned with the Matatag Curriculum of the Department of Education.</h3>

    <p><span style="font-weight: bold;">Getting Started:</span> Register/Login: Create an account using your name, email, and password.
You may also sign in directly using your Google account (recommended for teachers).</p>
    <ul>
        <li>Teacher Accounts: Teachers may create class accounts for students by uploading a class list in Excel format.</li>
        <li>Each student will automatically receive a login using their LRN (Learner Reference Number) as their email and password.</li>
        <li>Teachers can manage, monitor, and reset student accounts from the teacher dashboard.</li>
    </ul>
    <h3>Dashboard</h3>
    <ul>
        <!-- <li>Overview: Get a snapshot of student progress and performance.</li> -->
        <li>Create Quizzes: Design and assign quizzes to students.</li>
        <li>Resource Library: Access a variety of learning materials and resources.</li>
    </ul>
    <h3>Quiz Creation</h3>
    <ul>
        <li>Teachers can upload lessons or topics, then choose to:</li>
        <li>Generate a quiz automatically based on the selected topic.</li>
        <li>Customize a quiz manually by selecting specific questions.</li>
    </ul>
    <h3>Results & Reports:</h3>
    <ul>
        <li>View detailed reports on student performance and quiz results.</li>
        <li>Track progress over time and identify areas for improvement.</li>
    </ul>
    <h3>Support:</h3>
    <ul>
        <li>For technical support, please contact our support team at support@elemath.com.</li>
        <li>Visit our Help Center for FAQs and troubleshooting guides.</li>
    </ul>
  </div>
  <div  class="terms-container" v-else-if="inNav === 'FAQ (Frequently Asked Questions)'">
    <!-- <h2>FAQ (Frequently Asked Questions)</h2> -->
   <h3>General Questions</h3>
   <p><span style="font-weight: bold;">Q:</span>  What is ELEMATH?</p>
   <p> <span style="font-weight: bold;">A:</span> ELEMATH is a digital tool that enhances mathematics learning for elementary students through interactive quizzes and activities. It is aligned with the Matatag Curriculum of the Department of Education, focusing on Mathematics for Grades 5 and 6.</p>
   <p><span style="font-weight: bold;">Q:</span> Who can use ELEMATH?</p>
   <p><span style="font-weight: bold;">A:</span> Both teachers and students at the elementary level. Teachers can create, assign, and monitor quizzes, while students can learn and practice through interactive activities.</p>
   <p><span style="font-weight: bold;">Q:</span> Does ELEMATH work on all devices?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. ELEMATH is web-based and works on desktops, tablets, and mobile browsers. For the best experience, use updated versions of Chrome, Edge, or Safari.</p>
   <p><span style="font-weight: bold;">Q:</span> Is my information safe?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. Your data is securely stored and protected. We do not share any personal information with third parties.</p>
   <p><span style="font-weight: bold;">Q:</span> Can I reset my password?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. On the login page, simply click “Forgot Password” and follow the instructions to reset.</p>
   <p><span style="font-weight: bold;">Q:</span> Is ELEMATH free?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. ELEMATH is designed as an academic project and is free for teachers and students to use.</p>
   <p><span style="font-weight: bold;">Q:</span> Can teachers create quizzes?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. Teachers can upload lessons or topics and either generate quizzes automatically or customize them manually. They can also launch quizzes as a classroom game where students join and wait until the teacher starts.</p>
   <p><span style="font-weight: bold;">Q:</span> How do students join a quiz?</p>
   <p><span style="font-weight: bold;">A:</span> Students will see a “Join Now” button on their dashboard whenever a quiz is active. They simply click it to enter the quiz lobby and wait for the teacher to start.</p>
   <p><span style="font-weight: bold;">Q:</span> What grade levels are supported?</p>
   <p><span style="font-weight: bold;">A:</span> Currently, ELEMATH focuses on Mathematics for Grades 5 and 6, aligned with the Matatag Curriculum of DepEd.</p>
   <p><span style="font-weight: bold;">Q:</span> Can teachers monitor student performance?</p>
   <p><span style="font-weight: bold;">A:</span> Yes. Teachers can track quiz results in real time and download student performance reports in Excel or PDF format.</p>
   <p><span style="font-weight: bold;">Q:</span> What if I encounter a technical issue?</p>
   <p><span style="font-weight: bold;">A:</span> Please check the User Guide and FAQ first. If the problem continues, you may contact the ELEMATH support team.</p>
  </div>
  <div  class="terms-container" v-else-if="inNav === 'Privacy Policy'">
    <h2> At ELEMATH, we respect your privacy and are committed to protecting your personal information.</h2>
    <ul>
        
        <li><p><span style="font-weight: bold;">Information We Collect:</span>  Name, email, and class details for account setup Quiz scores and activity performance.</p></li>
        <li><p><span style="font-weight: bold;">Why We Collect Data:</span>  To track student progress and generate reports for teachers.</p></li>
        <li><p><span style="font-weight: bold;">Data Protection:</span> Information is stored securely and accessible only to authorized administrators.</p></li>
        <li><p><span style="font-weight: bold;">Sharing of Data:</span> We do not sell, share, or transfer personal data to third parties.</p></li>
        <li><p><span style="font-weight: bold;">User Rights:</span> You may request to update or delete your account at any time.</p></li>

        <li><p><span style="font-weight: bold;">Contact:</span> For privacy concerns, email us at: elemathwebbased@email.com</p></li>
    </ul>
    
  </div>
</template>
<style scoped>
body{
    overflow: auto;
    scrollbar-width: thin;
}
nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
}
li button{
    font-weight: 800;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
img{
    cursor: pointer;
    height: 80px;
    width: auto;
    margin-right: 20px;
    position: absolute;
}
header{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* background-color: #4fc4f7; */
    padding: 20px;
    /* color: white; */
    position: relative;
}
.terms-container,header{
    padding: 20px;
    width: 80%;
    text-align: center;
    margin: 0 auto;
}
p{
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
</style>