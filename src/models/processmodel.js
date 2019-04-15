export default

` <?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:vendor="http://vendor" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.11.2">
  <bpmn:process id="Process_1" name="purchase to pay process" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="start">
      <bpmn:outgoing>SequenceFlow_1nhvb45</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1at8yvv" name="Create purchase request">
      <bpmn:incoming>SequenceFlow_1nhvb45</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0twbpt1</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_0zqr7dv" name="Inform purchase requester about received goods">
      <bpmn:incoming>SequenceFlow_0ppn5je</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0broofx</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_0q9ig93" name="Pay invoice">
      <bpmn:extensionElements>
        <vendor:foo name="compliance" value="requirement_Internal Policy_Payment 1_" />
        <vendor:foo name="infra" value="id-a89c7020-0dcd-4403-a632-f2babef1879c" />
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_0jxnvxf</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0wqfauo</bpmn:outgoing>
      <bpmn:property id="Property_0y2cvze" name="__targetRef_placeholder" />
      <bpmn:dataInputAssociation id="DataInputAssociation_1z0l3ic">
        <bpmn:sourceRef>DataObjectReference_0xfu54h</bpmn:sourceRef>
        <bpmn:targetRef>Property_0y2cvze</bpmn:targetRef>
      </bpmn:dataInputAssociation>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_03mawmn" name="end">
      <bpmn:incoming>SequenceFlow_1cc0c5w</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1nhvb45" sourceRef="StartEvent_1" targetRef="Task_1at8yvv" />
    <bpmn:sequenceFlow id="SequenceFlow_0ppn5je" sourceRef="ExclusiveGateway_18rnpii" targetRef="Task_0zqr7dv" />
    <bpmn:sequenceFlow id="SequenceFlow_0broofx" sourceRef="Task_0zqr7dv" targetRef="ExclusiveGateway_0belmxr" />
    <bpmn:sequenceFlow id="SequenceFlow_1cc0c5w" sourceRef="ExclusiveGateway_0belmxr" targetRef="EndEvent_03mawmn" />
    <bpmn:parallelGateway id="ExclusiveGateway_18rnpii" name="fork">
      <bpmn:incoming>SequenceFlow_0twbpt1</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0ppn5je</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1cyrbov</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:parallelGateway id="ExclusiveGateway_0belmxr" name="join">
      <bpmn:incoming>SequenceFlow_0broofx</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0wqfauo</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1cc0c5w</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:subProcess id="SubProcess_1kzc182" name="Approve&#10;invoice&#10;payment">
      <bpmn:extensionElements>
        <vendor:foo name="compliance" value="requirement_Internal Policy_Payment 1_" />
        <vendor:foo name="isComplianceProcess" value="true" />
        <vendor:foo name="infra" value="id-a89c7020-0dcd-4403-a632-f2babef1879c" />
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_1cyrbov</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0jxnvxf</bpmn:outgoing>
      <bpmn:property id="Property_1ysms1a" name="__targetRef_placeholder" />
      <bpmn:dataInputAssociation id="DataInputAssociation_1sshb2z">
        <bpmn:sourceRef>DataObjectReference_0xfu54h</bpmn:sourceRef>
        <bpmn:targetRef>Property_1ysms1a</bpmn:targetRef>
      </bpmn:dataInputAssociation>
    </bpmn:subProcess>
    <bpmn:sequenceFlow id="SequenceFlow_0twbpt1" sourceRef="Task_1at8yvv" targetRef="ExclusiveGateway_18rnpii" />
    <bpmn:dataObjectReference id="DataObjectReference_0xfu54h" name="invoice" dataObjectRef="DataObject_06tltoe" />
    <bpmn:dataObject id="DataObject_06tltoe" />
    <bpmn:sequenceFlow id="SequenceFlow_0wqfauo" sourceRef="Task_0q9ig93" targetRef="ExclusiveGateway_0belmxr" />
    <bpmn:sequenceFlow id="SequenceFlow_1cyrbov" sourceRef="ExclusiveGateway_18rnpii" targetRef="SubProcess_1kzc182" />
    <bpmn:sequenceFlow id="SequenceFlow_0jxnvxf" sourceRef="SubProcess_1kzc182" targetRef="Task_0q9ig93" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="383" y="222" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="390" y="258" width="23" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1at8yvv_di" bpmnElement="Task_1at8yvv">
        <dc:Bounds x="479" y="200" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0zqr7dv_di" bpmnElement="Task_0zqr7dv">
        <dc:Bounds x="816" y="141" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0q9ig93_di" bpmnElement="Task_0q9ig93" bioc:stroke="black" bioc:fill="none">
        <dc:Bounds x="908" y="279" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_03mawmn_di" bpmnElement="EndEvent_03mawmn">
        <dc:Bounds x="1150" y="222" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1159" y="262" width="18" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1nhvb45_di" bpmnElement="SequenceFlow_1nhvb45">
        <di:waypoint xsi:type="dc:Point" x="419" y="240" />
        <di:waypoint xsi:type="dc:Point" x="479" y="240" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="404" y="219" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0ppn5je_di" bpmnElement="SequenceFlow_0ppn5je">
        <di:waypoint xsi:type="dc:Point" x="672" y="215" />
        <di:waypoint xsi:type="dc:Point" x="672" y="181" />
        <di:waypoint xsi:type="dc:Point" x="816" y="181" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="642" y="192" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0broofx_di" bpmnElement="SequenceFlow_0broofx">
        <di:waypoint xsi:type="dc:Point" x="916" y="181" />
        <di:waypoint xsi:type="dc:Point" x="1064" y="181" />
        <di:waypoint xsi:type="dc:Point" x="1064" y="215" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="945" y="160" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1cc0c5w_di" bpmnElement="SequenceFlow_1cc0c5w">
        <di:waypoint xsi:type="dc:Point" x="1089" y="240" />
        <di:waypoint xsi:type="dc:Point" x="1150" y="240" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1075" y="219" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ParallelGateway_1cewf6b_di" bpmnElement="ExclusiveGateway_18rnpii">
        <dc:Bounds x="647" y="215" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="629" y="209" width="20" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ParallelGateway_1hylq2j_di" bpmnElement="ExclusiveGateway_0belmxr">
        <dc:Bounds x="1039" y="215" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1089" y="210" width="17" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SubProcess_1kzc182_di" bpmnElement="SubProcess_1kzc182" isExpanded="false" bioc:stroke="black" bioc:fill="grey">
        <dc:Bounds x="737" y="279" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0twbpt1_di" bpmnElement="SequenceFlow_0twbpt1">
        <di:waypoint xsi:type="dc:Point" x="579" y="240" />
        <di:waypoint xsi:type="dc:Point" x="647" y="240" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="568" y="219" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="DataObjectReference_0xfu54h_di" bpmnElement="DataObjectReference_0xfu54h">
        <dc:Bounds x="848" y="396" width="36" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="849" y="450" width="34" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="DataInputAssociation_1z0l3ic_di" bpmnElement="DataInputAssociation_1z0l3ic">
        <di:waypoint xsi:type="dc:Point" x="884" y="405" />
        <di:waypoint xsi:type="dc:Point" x="937" y="359" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0wqfauo_di" bpmnElement="SequenceFlow_0wqfauo">
        <di:waypoint xsi:type="dc:Point" x="1008" y="319" />
        <di:waypoint xsi:type="dc:Point" x="1064" y="319" />
        <di:waypoint xsi:type="dc:Point" x="1064" y="265" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1036" y="298" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1cyrbov_di" bpmnElement="SequenceFlow_1cyrbov">
        <di:waypoint xsi:type="dc:Point" x="672" y="265" />
        <di:waypoint xsi:type="dc:Point" x="672" y="319" />
        <di:waypoint xsi:type="dc:Point" x="737" y="319" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="687" y="286" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0jxnvxf_di" bpmnElement="SequenceFlow_0jxnvxf">
        <di:waypoint xsi:type="dc:Point" x="837" y="319" />
        <di:waypoint xsi:type="dc:Point" x="908" y="319" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="872.5" y="298" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="DataInputAssociation_1sshb2z_di" bpmnElement="DataInputAssociation_1sshb2z">
        <di:waypoint xsi:type="dc:Point" x="848" y="399" />
        <di:waypoint xsi:type="dc:Point" x="815" y="359" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;